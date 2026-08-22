---
date: 2026-08-16
category:
  - 项目笔记
tag:
  - 面试题
  - RAG
---

# 全栈 RAG 系统 学习手册

> 模拟面试官视角，按主题分类的深挖问题与参考回答。所有答案均基于本项目的**真实实现**，数字可当场在代码里指认。
> 配套文档：`项目说明-简历版.md`（项目构成与运行逻辑）。

---

## 基础概念表

| 概念                   | 是什么                                       | 作用                               | 重点理解                                                 |
| ---------------------- | -------------------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| **RAG**                | Retrieval-Augmented Generation，检索增强生成 | 让 LLM 先查资料，再回答            | **检索 + 生成**                                          |
| **Embedding 模型**     | 把文本转换成数字向量的模型                   | 将文档和用户问题转换成可比较的向量 | **文本 → 向量**                                          |
| **向量 Embedding**     | 一串浮点数，例如 `[0.12, -0.38, ...]`        | 表示文本的语义特征                 | 语义相近的文本，向量通常也更接近                         |
| **向量维度**           | 一个 Embedding 向量有多少个数字              | 决定向量空间的维度                 | 1536 维 ≠ 文本有 1536 个字                               |
| **向量数据库**         | 专门存储和检索向量的数据库                   | 快速找到和问题最相似的 Chunk       | 如 Milvus、Qdrant、pgvector、Chroma                      |
| **相似度**             | 衡量两个向量有多接近                         | 判断哪些 Chunk 与问题最相关        | 常见：Cosine Similarity、Dot Product、Euclidean Distance |
| **Cosine Similarity**  | 通过两个向量夹角计算相似程度                 | RAG 中非常常见的相似度计算方式     | 越接近 1，通常表示越相似                                 |
| **Chunk**              | 文档切分后的文本片段                         | 避免一次把整篇文档塞进模型         | RAG 检索的基本单位                                       |
| **chunk_size**         | 每个 Chunk 的大小                            | 控制每段文本包含多少内容           | 太小容易丢上下文，太大检索不精准                         |
| **chunk_overlap**      | 相邻 Chunk 重叠的内容大小                    | 防止切分位置导致上下文丢失         | 例如 size=500，overlap=50                                |
| **Top-K**              | 检索最相似的 K 个 Chunk                      | 控制第一次召回多少结果             | Top-K=5 就是取最相关的 5 个                              |
| **召回 Recall**        | 从知识库中找出相关内容                       | RAG 的第一阶段                     | **宁可多找一些候选**                                     |
| **Rerank 重排**        | 对召回结果再次进行精确排序                   | 提高最终相关性                     | **从候选中挑最好的**                                     |
| **Reranker 模型**      | 专门判断 Query 和文本相关性的模型            | 给 Query-Chunk 对重新打分          | 比单纯向量相似度更精细                                   |
| **Context**            | 最终提供给 LLM 的相关文本                    | 给 LLM 提供外部知识                | 通常来自 Top-K / Rerank 结果                             |
| **Prompt**             | 发送给 LLM 的提示词                          | 告诉模型如何利用检索结果回答       | 常包含 Context + Question                                |
| **LLM**                | 大语言模型                                   | 根据问题和检索内容生成最终答案     | GPT、Claude 等                                           |
| **Metadata**           | Chunk 附带的额外信息                         | 方便过滤和追踪来源                 | 如文件名、页码、文档 ID                                  |
| **Metadata Filtering** | 根据 metadata 进行过滤                       | 缩小搜索范围                       | 例如只搜索 `department=技术部`                           |
| **Vector Search**      | 向量搜索                                     | 根据向量相似度查找 Chunk           | RAG 的核心检索方式之一                                   |
| **Hybrid Search**      | 向量搜索 + 关键词搜索                        | 同时考虑语义和关键词               | 对专业术语、编号等场景很有用                             |
| **Query Rewrite**      | 改写用户问题                                 | 把用户问题转换成更适合检索的 Query | 提高召回效果                                             |
| **Query Expansion**    | 一个问题扩展成多个查询                       | 从不同角度检索                     | 提高召回覆盖率                                           |
| **Context Window**     | LLM 一次能够处理的最大 Token 数              | 限制最终能塞多少 Context           | 不是越多越好                                             |
| **Token**              | LLM 处理文本的基本单位                       | 衡量输入输出长度                   | Token ≠ 字符 ≠ 单词                                      |
| **Grounding**          | 让回答基于检索到的真实资料                   | 降低模型胡编乱造                   | RAG 的核心目标之一                                       |
| **Hallucination**      | 模型生成不存在或错误的信息                   | RAG 希望尽量降低的问题             | 检索不到正确资料时尤其明显                               |

转化的维度就是，Embedding 模型使用 多少个数（多少维度的向量）来表示**这段文本**的语义特征。

那么两个向量越接近，就认为这两段文本的语义越相似。

常见的计算方法：

| 方法               | 简单理解                 |
| ------------------ | ------------------------ |
| Cosine Similarity  | 看两个向量的方向是否接近 |
| Dot Product        | 计算向量点积             |
| Euclidean Distance | 看两个向量空间距离有多远 |

Chunk就是将一大堆文字切分为一段一段的固定长度为chunk_size的文本，chunk_overlap指的是两段相邻文本之间的共同文字长度。chunk_overlap 决定相邻两块重叠多少内容。

Top-K 就是第一次检索时，准备召回多少个候选 Chunk（从知识库中找出多少相关内容）。

Embedding 模型负责“找得广”，在知识库中寻找众多相关内容，根据Top-K召回候选 Chunk ；

Rerank 负责“排得准”，将Query 与每个chunk再重新算相似度，给Query-Chunk 对重新打分。最后只取最符合的几个chunk出来。

**最关键的一句话可以记成：**

> **Embedding 把文本变成向量，向量数据库负责根据向量相似度召回 Chunk，Top-K 控制召回数量，Rerank 对召回结果重新排序，最后把最相关的 Chunk 作为 Context 交给 LLM 生成答案。**

## 〇、数字速查表（先背这个）

项目的相关数字速查表：

| 项 | 值 | 出处 |
|----|----|----|
| Embedding 模型 | paraphrase-multilingual-MiniLM-L12-v2（本地） | `.env` EMBEDDING_MODEL |
| **向量维度** | **384 维** | 模型固有输出维度 |
| 模型最大输入 | 128 tokens（超出截断，见 Q1.4） | 模型 max_seq_length |
| chunk_size | 1000（字符） | `.env` CHUNK_SIZE |
| chunk_overlap | 200（字符） | `.env` CHUNK_OVERLAP |
| Top-K | 5 | `.env` RETRIEVAL_TOP_K |
| LLM | gpt-5.5（OpenAI 兼容中转） | `.env` LLM_MODEL |
| temperature | 0.7 | `.env` LLM_TEMPERATURE |
| max_tokens | 2048 | `.env` LLM_MAX_TOKENS |
| 支持格式 | PDF / TXT / MD / DOCX / CSV（5 种） | loaders |
| MySQL 表 | knowledge_bases、documents、chat_messages（3 张） | alembic 迁移 |
| 存储架构 | 2 个数据库（MySQL + ChromaDB）+ 1 个文件系统（uploads/） | 见 Q3.0 |
| PDF 解析 | pypdf 逐页 extract_text()，页码进 metadata | loaders |
| 对话记录 | chat_messages 表自动落库（含来源 JSON），刷新可恢复 | services/rag.py |
| 向量库 | ChromaDB，每知识库一个 collection（kb_{id}） | chroma_store.py |
| 相似度 | Chroma 默认 L2（欧氏距离），可配 cosine | Chroma 默认 space=l2 |
| 测试 | 20 个 pytest，约 3 秒跑完 | tests/ |
| 接口数 | 15 个（REST 13 + SSE 1 + 历史 2，其中删除类共用） | api/v1 |
| 上传上限 | 50MB | MAX_UPLOAD_SIZE |
| Embedding 模型体积 | 约 470MB（首次下载后离线可用） | HuggingFace |

---

## 〇·二、LangChain 在项目里干了什么？（必问）

**答**：用了它的 **4 个标准组件 + 1 个统一数据结构**，全部代码里可指认：

1. **Document**（langchain_core）：全流程统一数据结构（page_content + metadata），解析→切分→检索→引用溯源全程传递，元数据不丢；
2. **RecursiveCharacterTextSplitter**（langchain_text_splitters）：chunk 切分，递归回退逻辑（段落→句子→词）自己手写易出边界 bug；
3. **ChatOpenAI**（langchain_openai）：LLM 统一调用层，配 base_url 即兼容任何 OpenAI 式 API；`astream()` 异步生成器直接对接 SSE 逐 token 输出；
4. **HuggingFaceEmbeddings**（langchain_huggingface）：本地嵌入模型适配成 embed_documents/embed_query 标准接口；
5. **Chroma**（langchain_chroma）：向量库统一接口，创建时传入 embedding 函数——**写入自动 embed 文档、查询自动 embed 问题，两侧天然同模型同调用方式**，这是检索正确性的前提。

**核心价值是解耦**：业务代码零处直接依赖 OpenAI/Chroma 具体 API，换 LLM 改 .env、换向量库只重写 chroma_store.py 一个文件。

**同样重要的反面**：没用 LCEL 链式编排、Runnable、Memory、Agent——RAG 流程只有 4 步，手写编排控制流更清晰、调试更容易。LangChain 0.1→0.3 破坏性变更多，只依赖它稳定的核心抽象、不碰上层封装，是控制依赖风险的策略。（被追问"不用 LangChain 行不行"：行——openai sdk + chromadb sdk + pypdf 也能实现全部功能；LangChain 的净价值是标准接口带来的可替换性和成熟组件省掉的边界 bug，代价是依赖重、版本迁移成本，小项目可裸写，多模型/多库切换频繁时收益明显。）

---

## 一、Embedding 与向量模型

### Q1.1 向量模型选的什么？维度是多少？为什么？

**答**：本地部署的 `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`，**输出 384 维**。选它有三个原因：① 我用的 LLM 中转 API 实测没有 embeddings 端点（模型列表里只有 chat 模型，调 /v1/embeddings 返回错误）；② 它是多语言模型，中英文混合文档效果均衡，而很多轻量模型只优化英文；③ 12 层 MiniLM 结构，470MB、CPU 推理单句毫秒级，本地跑零成本且数据不出域。Embedding 和 LLM 在我的架构里是彻底解耦的两个工厂函数（`create_embeddings()` / `create_llm()`），换任何一侧都不动业务代码。

### Q1.2 为什么不用 OpenAI 的 text-embedding-3？

**答**：客观条件不允许（API 无该端点），但如果允许我会评估：text-embedding-3-small 也是 1536 维、按 token 计费。对本项目，本地模型的优势是**免费、离线、隐私**（企业知识库场景敏感文档不出内网）；劣势是效果上限低于商用 API。架构上我保留了切换能力——换模型只改一行配置，但要付出**全量重建向量索引**的代价（见 Q1.5）。

### Q1.3 相似度用什么算的？余弦还是欧氏距离？

**答**：当前 ChromaDB collection 用的是默认的 **L2 欧氏距离**做近邻检索。我了解三者的取舍：文本嵌入通常归一化后用**余弦相似度**（只看方向、对向量长度不敏感），欧氏距离对模长也敏感，内积兼顾两者。我的向量未显式归一化，所以严格来说 L2 和余弦的排序结果可能有细微差异；如果切换到 cosine，只需在创建 collection 时设置 `metadata={"hnsw:space": "cosine"}`，这也是我列在改进清单里的一项。

### Q1.4 ⚠️ 你的 chunk 是 1000 字符，但模型 max_seq_length 只有 128 tokens，这不矛盾吗？（高危陷阱题）

**答**（这题答好是加分项，答不好暴露没看懂模型）：确实存在这个真实的权衡。该模型输入上限 128 token，超过部分在编码时被截断——也就是说一个 1000 字符的中文 chunk 大约只有前 60~90 个字符真正参与了向量计算，后面的内容对检索向量没有贡献。我的应对逻辑是：① RecursiveCharacterTextSplitter 按语义边界切分，chunk 开头通常是完整的主题句，前缀信息密度高，截断的损失被部分缓解；② 200 字符的 overlap 让相邻 chunk 的头部信息重复出现，进一步降低漏检概率；③ 我知道改进方向：换 **BGE-M3**（支持 8192 token 输入、8192 维可选、中文 SOTA 之一）或 text-embedding-3，chunk 语义就能完整编码。这是"在免费离线的约束下先跑通、把限制想清楚"的决策，不是疏忽。

### Q1.5 换 Embedding 模型后，旧数据怎么办？

**答**：必须**全量重建索引**，没有捷径。因为不同模型的向量空间完全不兼容——384 维的向量和 1024 维的向量既不能比大小，即使维度凑巧相同，语义空间的分布也完全不同，混用会导致检索结果随机化。正确流程：停写入 → 新模型就位 → 遍历 documents 表按 file_path 重新解析、切分、编码 → 写入新 collection → 原子切换。我的设计里 metadata 保存了完整的溯源字段（document_id/chunk_index/page），重建时可以直接复用文档记录，不用用户重新上传。

### Q1.6 向量化是逐条还是批量的？性能怎么样？

**答**：走 LangChain 的 `Chroma.add_documents()`，内部会分批调 embedding 模型（sentence-transformers 的 `encode` 支持批量张量并行）。实测 1000 字符中文文档 2 个 chunk 入库全程 1~3 秒（含模型首次加载约 10 秒，我用 `lru_cache` 把模型做成进程级单例，只有第一次慢）。CPU 推理下单条编码毫秒级，当前单机场景完全够用；量级上去后可以换 GPU 或换 API embedding。

---

## 二、文档解析与切分（Chunking）

### Q2.0 PDF/Word 这类文档解析具体怎么做的？

**答**：解析层的设计目标是**统一抽象**——无论什么格式，最终都产出 LangChain 的 `List[Document]`（page_content + metadata），下游切分/向量化完全不感知格式差异。具体实现按扩展名路由到不同解析器：

- **PDF**：用 `pypdf` 的 `PdfReader` **逐页** `extract_text()` 提取文本层，每页生成一个 Document，`metadata={"page": 页码}` ——这是后来引用能精确到"第 N 页"的源头。注意局限：extract_text 只能拿到**文本层**，扫描件（纯图片 PDF）提取结果为空，需要 OCR（Tesseract/PaddleOCR），当前版本未集成，遇到会标记该页为空、整页无文本时文档报"内容为空"错误。
- **DOCX**：`python-docx` 遍历段落拼接文本（表格内容当前不提取，是已知边界）。
- **TXT/MD**：读字节后按 **UTF-8 → GBK → latin-1** 依次尝试解码（中文 Windows 文件常见 GBK，直接 utf-8 打开会炸）。
- **CSV**：csv 模块逐行读、单元格拼接，openpyxl 处理 Excel 变体。

解析后立即进入 RecursiveCharacterTextSplitter 切分（见 Q2.1），split 时 page metadata 自动继承到每个 chunk。

### Q2.1 怎么切 chunk 的？切分策略是什么？

**答**：用 LangChain 的 **RecursiveCharacterTextSplitter（递归字符切分器）**，参数 chunk_size=1000、chunk_overlap=200（都是字符单位）。它的工作原理：按分隔符优先级**递归尝试**——我的分隔符列表是 `["\n\n", "\n", "。", "！", "？", ".", "!", "?", " ", ""]`——先尽量按段落切，段落超长再按句子切，句子还超长才按空格、最终按字符硬切。这样保证每个 chunk 尽量是**完整的语义单元**，而不是从句子中间腰斩。解析阶段就产出结构化 Document（PDF 逐页提取带 page 号），切分后给每个 chunk 注入 metadata：`knowledge_base_id / document_id / document_name / chunk_index / page / source`——这些字段是后来"引用溯源到第几页第几个片段"的数据基础。

### Q2.2 为什么是 1000/200？怎么调优的？

**答**：1000/200 是中文知识文档的常用起点，我的调优逻辑是双向约束：**chunk 太大**（>1500 字符）→ 单个 chunk 主题稀释，向量表征被"平均化"，检索精度下降，且 5 个 chunk 塞进 prompt 容易顶到上下文预算；**chunk 太小**（<300 字符）→ 上下文残缺，模型拿到片段答不完整，且 chunk 总数膨胀、overlap 冗余占比升高。overlap=200（chunk 的 20%）是经验比例：保证跨 chunk 的连续语义（比如一个定义跨在两个 chunk 边界）至少完整出现在一个 chunk 里。严谨做法是拿评测集跑 Recall@K 对比 500/1000/1500 三档，这是我在"演进路线"里明确的下一步。

### Q2.3 overlap 太大或太小会怎样？

**答**：太小（如 0）——边界信息丢失，比如结论在 chunk A 末尾、细节在 chunk B 开头，两边的向量都不完整，检索命中任一都可能答不好；太大（如 50%）——存储和检索的重复数据翻倍，且检索回来的 top-5 可能大半是同一段内容的重复变体，浪费宝贵的上下文窗口。20% 左右是社区验证过的平衡点。

### Q2.4 按字符切还是按 token 切？区别是什么？

**答**：我按**字符**切（RecursiveCharacterTextSplitter 默认），区别在于：token 切分对预算精确（LLM 按 token 计费/限长），但需要依赖分词器（中文 tokenizer 的切分点往往不是语义边界）；字符切分简单直观、配合中文标点分隔符依然能对齐语义边界。我的场景是"塞进 prompt 的量不大"（5 chunks × 1000 字符 ≈ 5000 字符），字符切够用；如果做严格的 token 预算控制，LangChain 也支持传 tokenizer 按 token_length 计量，属于一行参数的改动。

### Q2.5 表格、代码这类内容被切坏了怎么办？

**答**：这是字符切分的真实弱点——Markdown 表格从中间切断后，每个 chunk 都只剩半张表。我的缓解：Markdown/代码文档整体偏短时（如我的测试文档）单 chunk 装下，没触发问题；系统性方案是**结构感知切分**：用 MarkdownHeaderTextSplitter 先按标题层级切（表格天然聚在某一节内）、代码块用语言感知的 CodeSplitter 按语法边界切。这是明确的改进项，当前版本优先保证主流文本文档的质量。

### Q2.6 每个 chunk 带了哪些元数据？为什么这么设计？

**答**：`knowledge_base_id`（隔离检索范围）、`document_id`（删除文档时按它条件删除向量）、`document_name` / `source`（引用展示）、`chunk_index`（定位是文档内第几块）、`page`（PDF 页码，回答引用"第 N 页"就靠它）。设计原则是**元数据在写入时一次性注入**而不是查询时反查，检索结果自带完整溯源信息，省掉一次 MySQL 回表。

---

## 三、向量数据库与索引

### Q3.0 文档存在哪的？这个项目用了几个数据库？

**答**：**两个数据库 + 一个文件系统**，不是三个数据库——这是常见误解，我拆开说：

1. **本地文件系统**（`backend/uploads/kb_{id}/{uuid}.{ext}`）：存**原始文件**。为什么不用 MongoDB 这类文档数据库？因为单机场景下原始文件就是二进制资源，文件系统零依赖、最简单可靠；uuid 重命名同时防路径穿越；documents 表的 `file_path` 字段做了路径抽象，多机部署时换 MinIO/S3 只改存储实现，不动表结构。预览接口按 file_path **重新解析**返回全文——不额外存一份提取文本，避免文件和文本双写不一致（chunk 级文本在 Chroma 里天然有）。
2. **MySQL**（3 张表）：knowledge_bases / documents（状态机）/ chat_messages（对话记录），管事务、外键级联、结构化查询。
3. **ChromaDB**：向量 + chunk 文本 + 溯源 metadata，管 ANN 检索。

各司其职的判断标准：**按访问模式选存储**——元数据要事务和条件查询（MySQL），向量要近邻索引（向量库），原始文件只要按路径读写（文件系统）。

### Q3.1 为什么选 ChromaDB？

**答**：三个原因：① 指定用 MySQL，但实测本机 MySQL 8.0.41 没有 VECTOR 类型和向量插件（我查过 information_schema.PLUGINS），且 MySQL 缺 ANN 索引，不适合做向量检索；② Chroma 是嵌入式模式（pip 装完即用、数据本地持久化），零运维，和"本地可跑通"的项目定位匹配；③ 它实现的是 LangChain VectorStore 标准接口，我把所有向量操作收敛到一个模块（`rag/vectorstores/chroma_store.py`），换 Milvus/Qdrant 只重写这一层的四个函数。业务数据（知识库/文档元数据/状态机）仍留在 MySQL，各司其职。

### Q3.2 HNSW 是什么？为什么向量检索不用精确搜索？

**答**：HNSW（分层可导航小世界图）是 Chroma 底层的 ANN（近似最近邻）索引：把向量组织成多层图，上层稀疏做长距离跳跃、下层稠密做精确逼近，查询时从顶层入口贪心下降，复杂度近似 **O(log n)**，代价是结果可能极小概率漏掉真最近邻（可调 ef 参数在召回率和速度间权衡）。精确 KNN 是 O(n) 暴力比对，百万级向量单查询就要几百毫秒起，而 HNSW 毫秒级。RAG 场景本来就要 top-5 给 LLM 重排上下文，1% 的漏检完全可接受——这是典型的用"可控的近似"换"数量级的速度"。

### Q3.3 为什么每个知识库一个 collection，而不是全部存一个 collection 加 metadata 过滤？

**答**：我权衡过。分 collection（当前方案）：知识库间物理隔离，删知识库 = drop collection 一步完成，索引规模小检索快；代价是 collection 数量多时 Chroma 客户端管理开销略增，且跨库检索要开多个句柄。合 collection + where 过滤：跨库检索、按 metadata 灵活过滤方便；但每次检索都带 where 条件走过滤逻辑，删知识库要按条件批量删向量（慢且残留风险）。我的场景是"单用户多知识库、检索永远单库内"，隔离收益大于灵活损失，选了前者。如果做 SaaS 多租户全局搜索，会重新评估。

### Q3.4 删除一个文档，向量怎么保证同步删掉？

**答**：service 层串联三步：MySQL 删 documents 记录 → Chroma 按 `where={"document_id": id}` 删除该文档全部向量 → 删本地文件（best-effort，失败只记日志）。删知识库则更直接：MySQL 外键 `ON DELETE CASCADE` 级联删文档记录，向量侧 drop 整个 collection。我用真实场景验证过：删除一个 PDF 后问它相关内容，检索不再返回该文档——两库一致性由 service 层的调用顺序保证（先删关系库再删向量库，即使中途失败，残留的是"孤儿向量"，下次删库时会随 collection 一起清掉，不会出现反向的"有记录无向量"脏状态）。

### Q3.5 数据量到千万级向量，你的架构还能撑吗？

**答**：单机 Chroma 会到瓶颈（内存装不下 HNSW 图、无分布式分片）。我的应对：向量层是可替换抽象，切换路径是 **Milvus 集群**（分片 + 标量过滤 + GPU 索引）或 Qdrant 集群，业务代码零改动；MySQL 侧加好索引即可支撑。另外可以在进入向量库前加一层 **BM25/关键词初筛** 或用文档级摘要向量先路由，缩小候选集。这是架构上"先把接口抽象对，规模来了换实现"的典型场景。

---

## 四、检索与召回评估（重点章节）

### Q4.1 召回测试是什么？你的项目怎么做召回评估？

**答**：召回测试（检索质量评估）是 RAG 里**回答质量的上游**——检索不命中，LLM 再强也无中生有。标准做法分三步：

1. **构造评测集**：一组（query, 应命中的标准 chunk/document）对。可以从文档里反向出题（拿某段原文让 GPT 生成"这段能回答什么问题"），或人工整理高频问题。
2. **定义指标**：
   - **Hit Rate@K**：Top-K 结果里是否包含标准答案所在 chunk（0/1）
   - **Recall@K**：多标准 chunk 时的召回比例
   - **MRR**（平均倒数排名）：标准 chunk 排第几名，越靠前分越高（第 1 名 = 1.0，第 3 名 = 0.33）
   - **NDCG**：考虑位置折损的排序质量
3. **对照实验**：改参数（chunk 大小、Top-K、模型、是否 rerank）→ 重跑评测集 → 比指标。

**我项目里的实际做法**（诚实版）：当前版本做了**定性验证**——用三个代表性问题实测：问"向量数据库"正确路由到 MD 文档、问"降低幻觉"路由到 DOCX 文档、问无关问题（红烧肉）检索结果不含答案且模型正确拒答。规模化的量化评测集（约 50~100 条）+ Recall@5/MRR 脚本是我明确的下一步，这也是调参不再拍脑袋的前提。

### Q4.2 Top-K 为什么是 5？大了小了会怎样？

**答**：K 是"上下文充分性"和"噪声稀释"的权衡。K 太小（1~2）：答案依据的片段没进上下文的概率高，模型被迫说"无法回答"；K 太大（15+）：不相关片段混入，两个副作用——稀释关键上下文的注意力（"迷失在中间"现象），且 prompt 变长、延迟和成本上升。5 是知识问答场景的常用值。更进一步的做法不是调大 K 而是加 **rerank**（见 Q4.4）：先向量粗排取 20，再精排取 5，两全其美。

### Q4.3 纯向量检索有什么短板？什么是混合检索？

**答**：向量检索擅长**语义匹配**（"怎么防止模型胡编" ↔ "反幻觉策略"），但弱于**精确匹配**：型号编码（"ERR-1042"）、人名、缩写这类 query，embedding 容易表征不准，反而是 BM25 这类关键词检索的强项。**混合检索（Hybrid Search）**就是同时跑两路：向量检索 + BM25 关键词检索，各取 Top-N 后用 **RRF（倒数排名融合，score = Σ 1/(k + rank_i)，k 常取 60）** 或加权归一化融合排序。Chroma 较新版本已支持全文检索，MySQL 本身也有 ngram 全文索引可用——两条腿都在我架构的扩展点上，实现层在 retriever 模块，不动其他代码。

### Q4.4 Rerank 是什么？为什么需要？没做的话怎么答？

**答**：Rerank 是"粗排 + 精排"两段式的精排阶段。向量检索是**双塔结构**——query 和文档**分别**编码成向量再算距离，速度快但丢失了词级交互；Reranker（如 bge-reranker、Cohere Rerank）是**交叉编码器**——把 (query, document) 拼在一起过模型，逐 token 交互打分，精度显著更高但每对都要跑一次模型，只适合对少量候选精排。所以工程上是：向量召回 Top-20（快而全）→ rerank 精选 Top-5（准而精）。**我的当前版本没做 rerank**，如实说明：当前单机 CPU 部署，加交叉编码器会明显拖慢首 token 延迟；且知识库规模小时直接 Top-5 效果可接受。它在我的演进清单上，接入点已预留（retriever 返回前的统一出口）。

### Q4.5 多轮对话你的系统支持吗？对话记录存了吗？query 不完整怎么办？

**答**：分两层回答。**记录层**：支持持久化——`chat_messages` 表自动落库每次问答（role/content/sources JSON），SSE 流式生成器结束时保存（中断时保存已生成的部分并标记），前端页面挂载时拉取历史完整恢复对话（含引用来源），也支持一键清空。**推理层**：当前每次检索仍是**单轮独立**的——历史没有参与 query 构造，这是诚实边界。完整多轮方案：① 检索前做 **query 改写**——把"那第二种呢？"用 LLM 结合历史改写成独立 query（"RAG 的第二种优势是什么？"）再去检索，否则检索词残缺直接拉胯召回；② 历史摘要压缩进 prompt（控制在 N 轮内防上下文膨胀）。因为消息表和前端会话结构都已就位，加多轮主要是改写器和 prompt 组装的工作。

### Q4.6 什么是 MMR？什么时候用？

**答**：Maximal Marginal Relevance（最大边际相关）。普通 top-K 可能返回 5 个几乎同义的 chunk（尤其 overlap 大时），MMR 在迭代选 chunk 时兼顾"与 query 相关"和"与已选结果不重复"：`MMR = λ·sim(query, d) − (1−λ)·max sim(d, 已选)`，λ 常取 0.5~0.7。适合"要覆盖面"的摘要类场景；精确问答场景未必更优。LangChain 的 `as_retriever(search_type="mmr")` 一个参数即可开，属于我预留的可选开关。

### Q4.7 检索回来的内容怎么拼进 prompt 的？上下文超长怎么办？

**答**：我设计了**编号上下文**：`[1] 来源: xxx.pdf 第3页\n<内容>`，编号与返回给前端的 sources 数组顺序严格一致，模型被要求在句末标注 [n]——这就是引用溯源的闭环。超长控制有三层：① Top-K=5 × 1000 字符 ≈ 5000 字符，天然有界；② chunk_size 是配置项，可整体下调；③ 兜底策略（当前未触发所以未实现）：按相关性分数截断到预算内、或对超长 chunk 先摘要再入 prompt。temperature 0.7 + max_tokens 2048 控制输出侧。

---

## 五、Prompt 设计与生成质量

### Q5.1 你的 Prompt 是怎么设计的？怎么防幻觉？

**答**：System Prompt 四条硬约束：① 只依据知识库内容回答、不编造；② 检索不到就明确说"根据知识库内容无法回答该问题"（宁可承认不知道）；③ 引用处标 [n]；④ 与用户语言一致。防幻觉是**三道防线**：Prompt 约束（源头）→ 编号引用 + 前端来源按钮可点开原文核对（验证）→ 检索为空时根本不进模型、直接返回固定话术（兜底）。实测无关问题（"怎么做红烧肉"）正确拒答，5 条优势类问题句句带 [1] 引用可回溯到原文。

### Q5.2 为什么 temperature 设 0.7？

**答**：知识问答其实更适合调低（0~0.3，输出更确定、少发散），0.7 是通用默认起步值。我如实承认这是可优化点——正确的做法是按场景分：**事实问答用 0~0.2**（本项目应下调）、创作类才用 0.7+。改动是一个配置项，说明我对参数语义是清楚的，当前值属于"默认值尚未按场景精调"。

### Q5.3 模型输出里引用标错编号怎么办？检索 5 条但只用 2 条，来源区怎么展示？

**答**：先说展示问题（真实踩过的坑）：检索固定返回 Top-5，但模型可能只引用两三条，早期版本把 5 个全部平铺成"参考来源"，用户反馈"回答明明只用 [1][5]，为什么列了 5 个"。迭代过程分两版：第一版把来源分成"实际引用（高亮）/其他检索片段（弱化）"两组，用户进一步反馈未引用的不该出现；最终版是**前端从回答文本正则解析 [n] 标注，只展示被引用的来源**，未引用的检索片段不进对话；模型没标任何 [n] 时回退为全部展示（无法区分就不假装区分）；越界编号（只有 5 条却标 [9]）忽略。再说标错编号的缓解：① prompt 明确"只标注实际参考的片段"；② 编号体系**结构性对齐**（prompt 片段号 = sources 数组序号），无映射歧义；③ 即便标错，前端 sources 是检索真实结果而非模型生成，用户核对原文以按钮内容为准。这个两轮迭代的例子也说明：检索日志（哪些 chunk 被召回）和用户视角（哪些被引用）是两个需求，后者该以模型标注为准。

---

## 六、流式输出与前端工程

### Q6.1 SSE 和 WebSocket 怎么选？为什么用 SSE？

**答**：本项目是**单向流**（服务端推 token 给客户端），SSE 足够且更简单：基于普通 HTTP（不用升级协议，代理/防火墙友好）、自动重连、Content-Type 一个头搞定。WebSocket 适合**双向**实时场景（协作编辑、游戏、语音）。代价是 SSE 原生是 GET + EventSource API 不支持 POST body，所以我前端用 `fetch + ReadableStream` 手写 SSE 解析（按 `\n\n` 分帧、解析 `data:` 前缀、缓冲半包），携带 JSON 请求体同时获得流式读取——axios 在浏览器**不支持增量读响应体**，这是选 fetch 的硬理由。

### Q6.2 你的 SSE 事件协议是怎么设计的？为什么 sources 先于 token？

**答**：四类事件：`sources`（来源数组）→ `token`（逐字内容，N 次）→ `done` | `error`。sources 先推是因为：检索是同步阶段，在 LLM 首个 token 出来前 sources 已经确定，先推让前端**立即渲染引用按钮**（用户在等待回答时就能看到"参考来源已就位"），感知性能更好；错误事件保证异常时连接也是正常关闭，前端能统一收尾（恢复输入框、显示"已停止生成"）。

### Q6.3 "停止生成"按钮怎么实现的？

**答**：前端 `AbortController`——发起 fetch 时挂 signal，点停止调 `controller.abort()`，fetch 抛 AbortError，我在 catch 里识别它并按正常结束处理（onDone 而不是 onError）。服务端：客户端断开后 StreamingResponse 的迭代会被打断，生成器退出，LangChain 的 astream 消费终止，不再白白烧 LLM token。停止后已收到的部分内容保留显示，空内容则显示"（已停止生成）"。

### Q6.4 逐字渲染为什么流畅？React 性能注意了什么？

**答**：每个 token 到达就 append 到 Zustand store 的消息 content，react-markdown 增量重渲染。注意点：① 消息列表按 id 定位更新（map 替换），不整表重建；② 自动滚动用 `scrollIntoView({behavior:'smooth'})` 挂在哨兵 div 上；③ 聊天状态（真正跨组件）才进全局 store，知识库列表等服务器数据留在页面局部状态——store 不当垃圾桶用。

---

## 七、系统设计与工程

### Q7.1 为什么 FastAPI？为什么 SQLAlchemy 用同步模式而不是 async？

**答**：FastAPI：原生 async、Pydantic 数据校验、自动 OpenAPI 文档、依赖注入（get_db 会话管理）——和"API 密集 + AI 服务"场景高度匹配。同步 SQLAlchemy 的取舍：本项目重 IO 在**外部服务**（LLM/Embedding 调用走 httpx/模型推理已是异步或进程内计算），DB 操作轻量，pymysql 同步驱动在 FastAPI 的线程池里跑足够；引入 asyncmy + async session 会增加复杂度而当前没有并发瓶颈。这是"按实际瓶颈选复杂度"，量级上来换 aiomysql 是配置级改动。

### Q7.2 异步处理为什么用 BackgroundTasks 不用 Celery？

**答**：BackgroundTasks（FastAPI 内置）**进程内**执行：零额外组件、零延迟派发，适合单机开发/小规模。它的三个限制我很清楚：① 不持久化——进程重启任务丢失（文档会卡在 processing）；② 不分布——多 worker 时任务只在接收请求的进程跑；③ 无重试/优先级。触发切换的信号：多实例部署、需要重试与死信、任务量大到挤占 API 进程。因为处理逻辑已独立成 `document_processor.py`（自己管 DB 会话），换 Celery 只是换触发器：`background_tasks.add_task(process_document, id)` 改成 `process_document.delay(id)`，业务零改动。

### Q7.3 数据库怎么设计的？为什么文档元数据和向量分开存？

**答**：MySQL 两张表：`knowledge_bases`（id/name/description/时间戳）、`documents`（外键级联删除 + filename/file_path/file_size/file_type/**status 状态机**/error_message/chunk_count）。分离的理由：关系库擅长事务、外键、状态管理、结构化查询（"列出所有 failed 文档"）；向量库擅长 ANN 检索——强行合一（比如向量存 BLOB）等于放弃索引能力退化成全表扫描 + Python 暴力算距离，我在设计文档里明确禁止了这个反模式。一致性由 service 层保证（见 Q3.4）。

### Q7.4 文档状态机怎么设计的？为什么要状态机？

**答**：`pending → processing → completed | failed`，failed 带 error_message。意义：① 上传接口立即返回，前端轮询状态渲染进度（每 2 秒）；② 失败可诊断——error_message 在文档列表展开可见（我演示过解析失败的场景）；③ 防悬挂——状态是最新的单点事实，任务崩溃也能从状态判断并人工重置。写入点全部在 processor 模块内收敛，业务侧只读。

### Q7.5 安全方面做了什么？

**答**：① API Key 全部走 .env + Pydantic Settings，.gitignore 排除，提供 .env.example 模板，代码零硬编码；② 文件上传三重校验：扩展名白名单（5 种）、50MB 上限、空文件拒绝；存储文件名用 **uuid 重命名**（不用用户原始文件名，杜绝路径穿越如 `../../etc/passwd`），原始名只存 DB；③ 日志不打 API Key 和文档内容；④ CORS 当前 `*` 是开发配置，生产应收紧到前端域名；⑤ 无鉴权（单用户本地系统），多用户时要加 API key/JWT——如实承认边界。

### Q7.6 CORS 是怎么解决的？

**答**：开发环境用 Vite proxy：前端请求 `/api/*`，dev server 转发到 8000 端口——同源请求根本不触发 CORS，这是最干净的方案。后端同时配了 CORSMiddleware 允许跨域作为兜底（生产直连或独立部署域名时生效）。

### Q7.7 怎么部署？Docker 化了吗？

**答**：当前是本地双进程（uvicorn 8000 + vite 5173），依赖就绪后一分钟启动。Docker 化路径清晰：后端一个镜像（Python + requirements）、前端 build 产物用 nginx 承载并反代 /api 到后端，docker-compose 编排；MySQL 用已存在的实例（compose 引 external network 或 host 网络），Chroma 数据和 uploads 目录挂 volume。没抢先做是因为先把功能闭环验证完，部署是纯工程收尾。

### Q7.8 并发上传同一个知识库的文档会出问题吗？

**答**：逐层分析：MySQL 侧各自独立行无冲突；文件名 uuid 避免覆盖；Chroma 侧并发 add_documents——客户端有锁保护（我的单例 client 用双重检查锁），HNSW 写入内部串行化，最坏是吞吐排队；Embedding 模型是 `lru_cache` 单例，sentence-transformers 的 encode 线程安全（GIL + 无状态前向）。真正的风险是**多进程部署**时每进程各加载一份 470MB 模型（内存 ×N），那时就该把 Embedding 独立成服务或换 API——这是上 Celery/独立推理服务的另一个理由。

### Q7.9 对话记录怎么持久化的？流式场景下什么时候落库？

**答**：`chat_messages` 表（knowledge_base_id 外键级联、role、content、sources 存 JSON）。落库时机是关键设计：**用户消息在检索成功后立即存**（保证失败也有问题记录），**助手消息在 SSE 生成器结束时存**——正常结束存完整回答+来源数组；异常/客户端中断时存已生成的部分内容（answer_parts 累积），完全没内容则存"（生成中断，请重试）"，避免历史里出现悬空的用户问题。持久化用**独立的 DB 会话**（SessionLocal 自开自关），因为流式生成器的生命周期长于 HTTP 请求的会话；且包了 best-effort try/except——**落库失败只记日志，绝不影响把回答吐给用户**（可用性优先于记录完整性）。前端挂载时 GET 历史恢复（消息 id 直接沿用服务端 id，本地新增消息的 id 计数从 max+1 续起，避免 React key 冲突）。

---

## 八、测试与质量

### Q8.1 测试策略是什么？LLM 和 Embedding 怎么 Mock？

**答**：20 个 pytest，三层覆盖：health/文档/知识库 CRUD/RAG 问答/SSE 流。Mock 关键点是 **patch 使用处而非定义处**——`create_llm`/`create_embeddings` 是工厂函数且被各模块 import 绑定，必须 patch `app.services.rag.create_llm`、`app.rag.vectorstores.chroma_store.create_embeddings` 这些引用点。假 Embedding 用**文本哈希生成确定性向量**（同文本必同向量），保证检索行为可预期；假 LLM 的 astream 按字符逐个 yield，SSE 的 token 序列照常走通。MySQL 和 Chroma 走真实环境，测试数据自建自删（kb fixture 用完即删）。

### Q8.2 除了自动化测试还做了什么验证？

**答**：真实浏览器 GUI 黑盒测试——完整走通创建知识库、上传、状态轮询、流式问答、引用点开、停止生成、删除确认全流程，**发现并修复了 3 个自动化测不出的真实 bug**：① 前端响应解包把 `data:null` 误判为错误导致删除后列表不刷新；② 停止生成后空消息永久 loading；③ 时间显示原始 ISO 格式。这个经历让我对"API 测试绿了 ≠ 用户体验对"有切身认识。

---

## 九、开放题：不足与演进（面试官必问"你项目有什么问题"）

标准策略：主动、具体、有优先级——说不足时同时给出方案和为什么还没做。

**如实清单（按优先级）**：

1. **量化检索评估缺失**：当前是定性验证，要做 50~100 条评测集 + Recall@5/MRR 脚本，之后一切调参（chunk/Top-K/模型）才有依据。（最优先）
2. **Embedding 128 token 截断**：换 BGE-M3（8192 token）需重建索引，收益是长 chunk 完整编码。
3. **无 rerank 与混合检索**：接入点是现成的（retriever 统一出口），当前单机 CPU 部署先保证延迟。
4. **推理层无多轮**：对话记录已持久化（chat_messages 表），但历史不参与检索 query 构造——需加 query 改写器（依赖上下文的追问现在是检索盲区）。
5. **BackgroundTasks 不持久**：进程重启任务丢、文档卡 processing，量级上来换 Celery + 状态恢复扫描。
6. **生产化欠账**：CORS 收紧、鉴权、Docker 部署、Embedding 服务化（多进程内存翻倍问题）。

**一句话总结**（面试收尾可用）："这个项目对我最大的价值是把 RAG 从'会调 API'推进到了'每个环节都有可解释的取舍'——向量维度和截断、chunk 的双向约束、两库一致性、引用闭环——我知道它现在停在哪里、下一步往哪走、为什么。"

---

## 十、压力快问快答（一行作答版）

- **Embedding 维度？** → 384 维（paraphrase-multilingual-MiniLM-L12-v2）。
- **切分器？** → RecursiveCharacterTextSplitter，1000/200 字符，中英文标点语义边界递归切。
- **Top-K？** → 5，可配置；计划 rerank 粗排 20 精排 5。
- **相似度算法？** → Chroma 默认 L2，可切 cosine（collection metadata 配 hnsw:space）。
- **向量库？** → ChromaDB 嵌入式，每知识库一个 collection，HNSW 索引 O(log n)。
- **为什么两库？** → MySQL 管事务/状态/级联，向量库管 ANN，合一等于放弃索引。
- **换 embedding 模型？** → 必须全量重建索引，向量空间不兼容。
- **SSE 为什么不用 WebSocket？** → 单向流 + 纯 HTTP，简单可靠；WS 留给双向场景。
- **前端流式怎么读？** → fetch + ReadableStream 手写 SSE 解析，axios 不支持增量读。
- **幻觉怎么防？** → Prompt 硬约束 + 编号引用可核对 + 空检索不进模型三道防线。
- **任务为什么异步？** → 解析+向量化秒级到分钟级，阻塞 HTTP 会拖垮 worker；状态机跟踪。
- **文档处理失败？** → 捕获全量异常，状态置 failed + error_message，服务不崩。
- **怎么删向量？** → 删文档按 document_id 条件删；删知识库直接 drop collection。
- **测试跑多久？** → 20 个测试约 3 秒，LLM/Embedding 全 Mock 零 API 消耗。
- **PDF 怎么解析？** → pypdf 逐页 extract_text 带页码 metadata；扫描件需 OCR（未集成，已知边界）。
- **文档存在哪？** → 原始文件在文件系统（uploads/kb_{id}/uuid.ext），元数据 MySQL，向量 ChromaDB：两库+一文件系统。
- **几个数据库？** → 2 个（MySQL + ChromaDB）+ 文件系统；按访问模式选存储。
- **对话记录存吗？** → chat_messages 表自动落库（含来源 JSON），流式结束/中断时保存，刷新可恢复。
- **项目最大不足？** → 量化评估体系缺失，目前调参靠定性验证，这是第一优先改进项。
