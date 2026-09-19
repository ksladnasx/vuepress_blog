import{_ as s,c as n,d as a,o as l}from"./app-2zHwW9E1.js";const i={};function t(d,e){return l(),n("div",null,[...e[0]||(e[0]=[a(`<h1 id="智能体开发平台节点配置逻辑" tabindex="-1"><a class="header-anchor" href="#智能体开发平台节点配置逻辑"><span>智能体开发平台节点配置逻辑</span></a></h1><blockquote><p>对应仓库: Code\\newfish\\postwise_main\\postwise\\src\\frontend\\platform\\src\\pages\\BuildPage：</p></blockquote><p>我按“只读源码、不启动后端”的方式看了一遍。结论先说：</p><p><strong>\`src/pages/BuildPage/flow/FlowNode\` 这套工作流节点，并不是由后端实时返回一份 \`{ model: { type: &#39;select&#39; }, temperature: { type: &#39;number&#39; } }\` 这样的表单 schema 来驱动的。</strong> 它的节点模板主要是<strong>前端硬编码</strong>在 <code>src/controllers/API/workflow.ts</code> 里；前端根据 <code>group_params[].params[].type</code> 做表单组件分发；后端主要负责<strong>保存整张 flow JSON</strong>，运行时根据 <code>node.data.type</code> 找到对应后端节点类，并把 <code>group_params</code> 里的 <code>key/value</code> 扁平化成运行参数。</p><hr><h2 id="_1-工作流节点-配置-模板-主要在哪个文件" tabindex="-1"><a class="header-anchor" href="#_1-工作流节点-配置-模板-主要在哪个文件"><span>1. 工作流节点“配置/模板”主要在哪个文件？</span></a></h2><p>核心文件是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/controllers/API/workflow.ts</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>里面的：</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> getWorkflowNodeTemplate <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span>res <span class="token operator">=&gt;</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">res</span><span class="token punctuation">(</span>i18next<span class="token punctuation">.</span>language <span class="token operator">===</span> <span class="token string">&#39;en&#39;</span> <span class="token operator">?</span> workflowTemplateEN <span class="token operator">:</span> workflowTemplate<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，虽然名字像 API，但它没有请求后端，而是直接返回本文件里的：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">const workflowTemplate = [...]</span>
<span class="line">const workflowTemplateEN = [...]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>这些模板里定义了节点：</p><ul><li><code>start</code></li><li><code>input</code></li><li><code>output</code></li><li><code>transfer</code></li><li><code>sensitive_guard</code></li><li><code>llm</code></li><li><code>agent</code></li><li><code>qa_retriever</code></li><li><code>rag</code></li><li><code>knowledge_retriever</code></li><li><code>report</code></li><li><code>code</code></li><li><code>condition</code></li><li><code>end</code></li></ul><p>节点结构大致是：</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  id<span class="token operator">:</span> <span class="token string">&quot;llm_xxx&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  type<span class="token operator">:</span> <span class="token string">&quot;llm&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  name<span class="token operator">:</span> <span class="token string">&quot;大模型&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  group_params<span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      name<span class="token operator">:</span> <span class="token string">&quot;模型设置&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      params<span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          key<span class="token operator">:</span> <span class="token string">&quot;model_id&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          label<span class="token operator">:</span> <span class="token string">&quot;模型&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          type<span class="token operator">:</span> <span class="token string">&quot;postwise_model&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          value<span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          required<span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          key<span class="token operator">:</span> <span class="token string">&quot;temperature&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          label<span class="token operator">:</span> <span class="token string">&quot;温度&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          type<span class="token operator">:</span> <span class="token string">&quot;slide&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          scope<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">          step<span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span></span>
<span class="line">          value<span class="token operator">:</span> <span class="token number">0.7</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前端侧节点列表读取路径是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/Sidebar.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这里调用：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">getWorkflowNodeTemplate()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>拖拽时把节点模板塞进：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">event.dataTransfer.setData(&quot;flownodedata&quot;, JSON.stringify(data));</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>落到画布时在：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/Panne.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>生成 ReactFlow node：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">const newNode = initNode(flowdata.node)</span>
<span class="line">return nds.concat({ id: nodeId, type: &#39;flowNode&#39;, position, data: newNode })</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，<strong>前端工作流节点和 UI 表单配置的源头是 <code>src/controllers/API/workflow.ts</code>，不是后端返回。</strong></p><hr><h2 id="_2-flownode-目录下真正的-表单渲染器-在哪" tabindex="-1"><a class="header-anchor" href="#_2-flownode-目录下真正的-表单渲染器-在哪"><span>2. FlowNode 目录下真正的“表单渲染器”在哪？</span></a></h2><p>核心是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/FlowNode/index.tsx</span>
<span class="line">src/pages/BuildPage/flow/FlowNode/ParameterGroup.tsx</span>
<span class="line">src/pages/BuildPage/flow/FlowNode/Parameter.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>渲染链路是：</p><ol><li><code>FlowNode/index.tsx</code></li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">node.group_params.map(group =&gt; &lt;ParameterGroup ... /&gt;)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol><li><code>ParameterGroup.tsx</code></li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">cate.params.map(item =&gt; &lt;Parameter item={item} ... /&gt;)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol><li><code>Parameter.tsx</code></li></ol><p>这里根据：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">item.type</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>做组件分发。</p><p>目前支持的类型包括：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">textarea              -&gt; TextAreaItem</span>
<span class="line">input                 -&gt; InputItem</span>
<span class="line">input_list            -&gt; InputListItem</span>
<span class="line">var                   -&gt; VarItem</span>
<span class="line">chat_history_num      -&gt; HistoryNumItem</span>
<span class="line">form                  -&gt; InputFormItem</span>
<span class="line">var_textarea          -&gt; VarTextareaItem</span>
<span class="line">var_textarea_file     -&gt; VarTextareaUploadItem</span>
<span class="line">output_form           -&gt; OutputItem</span>
<span class="line">postwise_model        -&gt; ModelItem</span>
<span class="line">agent_model           -&gt; ModelItem agent</span>
<span class="line">slide                 -&gt; SliderItem</span>
<span class="line">slide_switch          -&gt; SwitchSliderItem</span>
<span class="line">switch                -&gt; SwitchItem</span>
<span class="line">var_select            -&gt; VarSelectSingleItem</span>
<span class="line">user_question         -&gt; VarSelectItem</span>
<span class="line">knowledge_select_multi -&gt; KnowledgeSelectItem</span>
<span class="line">qa_select_multi       -&gt; KnowledgeQaSelectItem</span>
<span class="line">number                -&gt; InputItem type=&quot;number&quot;</span>
<span class="line">char_number           -&gt; InputItem char type=&quot;number&quot;</span>
<span class="line">code_input            -&gt; CodeInputItem</span>
<span class="line">code                  -&gt; CodePythonItem</span>
<span class="line">code_output           -&gt; CodeOutputItem</span>
<span class="line">add_tool              -&gt; ToolItem</span>
<span class="line">condition             -&gt; ConditionItem</span>
<span class="line">report                -&gt; ReportItem</span>
<span class="line">sql_config            -&gt; SqlConfigItem</span>
<span class="line">select_fileaccept     -&gt; FileTypeSelect</span>
<span class="line">image_prompt          -&gt; ImagePromptItem</span>
<span class="line">search_switch         -&gt; RetrievalWeightSlider</span>
<span class="line">sensitive_library_select -&gt; SensitiveLibraryItem</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有匹配，就会走：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">default:</span>
<span class="line">  return &lt;div&gt;Unsupported parameter type&lt;/div&gt;;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>重点：<strong>这里没有通用的 <code>select</code> 渲染器。</strong></p><hr><h2 id="_3-后端是否会返回-model-type-select-temperature-type-number-这种结构" tabindex="-1"><a class="header-anchor" href="#_3-后端是否会返回-model-type-select-temperature-type-number-这种结构"><span>3. 后端是否会返回 <code>{ model: { type: &#39;select&#39; }, temperature: { type: &#39;number&#39; } }</code> 这种结构？</span></a></h2><p>针对 <code>src/pages/BuildPage/flow/FlowNode</code> 这套工作流，源码层面看，<strong>不会</strong>。</p><p>这套工作流使用的是数组式结构：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">group_params: [</span>
<span class="line">  {</span>
<span class="line">    name: &quot;...&quot;,</span>
<span class="line">    params: [</span>
<span class="line">      {</span>
<span class="line">        key: &quot;model_id&quot;,</span>
<span class="line">        type: &quot;postwise_model&quot;,</span>
<span class="line">        value: &quot;&quot;</span>
<span class="line">      },</span>
<span class="line">      {</span>
<span class="line">        key: &quot;temperature&quot;,</span>
<span class="line">        type: &quot;slide&quot;,</span>
<span class="line">        scope: [0, 2],</span>
<span class="line">        step: 0.1,</span>
<span class="line">        value: 0.7</span>
<span class="line">      }</span>
<span class="line">    ]</span>
<span class="line">  }</span>
<span class="line">]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而不是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  model: {</span>
<span class="line">    type: &quot;select&quot;,</span>
<span class="line">    ...</span>
<span class="line">  },</span>
<span class="line">  temperature: {</span>
<span class="line">    type: &quot;number&quot;,</span>
<span class="line">    ...</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后端工作流模型里接收的是类似：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">class BaseNodeData(BaseModel):</span>
<span class="line">    id: str</span>
<span class="line">    type: str</span>
<span class="line">    name: Optional[str]</span>
<span class="line">    description: Optional[str]</span>
<span class="line">    group_params: Optional[List[NodeGroupParams]]</span>
<span class="line">    tab: Optional[dict]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>路径：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">backend/postwise/workflow/common/node.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>参数定义是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">class NodeParams(BaseModel):</span>
<span class="line">    key: str</span>
<span class="line">    label: Optional[str]</span>
<span class="line">    value: Optional[Any]</span>
<span class="line">    type: Optional[str]</span>
<span class="line">    help: Optional[str]</span>
<span class="line">    tab: Optional[str]</span>
<span class="line">    placeholder: Optional[str]</span>
<span class="line">    required: Optional[bool]</span>
<span class="line">    options: Optional[Any]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后端运行时在：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">backend/postwise/workflow/nodes/base.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>做了扁平化：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">for one in self.node_data.group_params:</span>
<span class="line">    for param_info in one.params:</span>
<span class="line">        self.node_params[param_info.key] = copy.deepcopy(param_info.value)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说后端节点运行时关心的是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">self.node_params[&quot;model_id&quot;]</span>
<span class="line">self.node_params[&quot;temperature&quot;]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如 LLM 节点：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">backend/postwise/workflow/nodes/llm/llm.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>里面用的是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">LLMService.get_postwise_llm_sync(</span>
<span class="line">    model_id=self.node_params[&#39;model_id&#39;],</span>
<span class="line">    temperature=self.node_params.get(&#39;temperature&#39;, 0.3),</span>
<span class="line">    cache=False</span>
<span class="line">)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以后端并不是返回一套用于前端渲染的表单 schema，而是消费前端保存/提交的节点数据。</p><p>补充一点：仓库里确实还有另一套更老/更通用的 <code>CustomNodes/GenericNode</code>、<code>node.template[field]</code> 体系，看起来更像“对象映射式 schema”。但那不是你问的 <code>src/pages/BuildPage/flow/FlowNode</code> 这套工作流节点渲染链路。</p><hr><h2 id="_4-后端节点类型和执行类的映射在哪" tabindex="-1"><a class="header-anchor" href="#_4-后端节点类型和执行类的映射在哪"><span>4. 后端节点类型和执行类的映射在哪？</span></a></h2><p>如果问的是“前端 <code>node.type = &#39;llm&#39;</code> 到后端执行类 <code>LLMNode</code> 的映射”，在：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">backend/postwise/workflow/nodes/node_manage.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>核心映射：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">NODE_CLASS_MAP = {</span>
<span class="line">    NodeType.START.value: StartNode,</span>
<span class="line">    NodeType.END.value: EndNode,</span>
<span class="line">    NodeType.INPUT.value: InputNode,</span>
<span class="line">    NodeType.OUTPUT.value: OutputNode,</span>
<span class="line">    NodeType.TRANSFER.value: TransferNode,</span>
<span class="line">    NodeType.TOOL.value: ToolNode,</span>
<span class="line">    NodeType.RAG.value: RagNode,</span>
<span class="line">    NodeType.REPORT.value: ReportNode,</span>
<span class="line">    NodeType.QA_RETRIEVER.value: QARetrieverNode,</span>
<span class="line">    NodeType.CONDITION.value: ConditionNode,</span>
<span class="line">    NodeType.AGENT.value: AgentNode,</span>
<span class="line">    NodeType.CODE.value: CodeNode,</span>
<span class="line">    NodeType.LLM.value: LLMNode,</span>
<span class="line">    NodeType.KNOWLEDGE_RETRIEVER.value: KnowledgeRetriever,</span>
<span class="line">    NodeType.SENSITIVE_GUARD.value: SensitiveGuardNode,</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>节点类型枚举在：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">backend/postwise/workflow/common/node.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>包括：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">START = &quot;start&quot;</span>
<span class="line">END = &quot;end&quot;</span>
<span class="line">INPUT = &quot;input&quot;</span>
<span class="line">AGENT = &quot;agent&quot;</span>
<span class="line">CODE = &quot;code&quot;</span>
<span class="line">CONDITION = &quot;condition&quot;</span>
<span class="line">LLM = &quot;llm&quot;</span>
<span class="line">OUTPUT = &quot;output&quot;</span>
<span class="line">TRANSFER = &quot;transfer&quot;</span>
<span class="line">QA_RETRIEVER = &quot;qa_retriever&quot;</span>
<span class="line">RAG = &quot;rag&quot;</span>
<span class="line">REPORT = &quot;report&quot;</span>
<span class="line">TOOL = &quot;tool&quot;</span>
<span class="line">KNOWLEDGE_RETRIEVER = &quot;knowledge_retriever&quot;</span>
<span class="line">SENSITIVE_GUARD = &quot;sensitive_guard&quot;</span>
<span class="line">NOTE = &quot;note&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_5-节点输入框的取值范围怎么定义" tabindex="-1"><a class="header-anchor" href="#_5-节点输入框的取值范围怎么定义"><span>5. 节点输入框的取值范围怎么定义？</span></a></h2><p>主要分三类。</p><h3 id="_5-1-slider-类-由模板里的-scope-和-step-定义" tabindex="-1"><a class="header-anchor" href="#_5-1-slider-类-由模板里的-scope-和-step-定义"><span>5.1 Slider 类：由模板里的 <code>scope</code> 和 <code>step</code> 定义</span></a></h3><p>组件文件：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/FlowNode/component/SliderItem.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>里面：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;Slider</span>
<span class="line">  min={data.scope?.[0] || 0}</span>
<span class="line">  max={data.scope?.[1] || 10}</span>
<span class="line">  step={data.step || 1}</span>
<span class="line">/&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以：</p><ul><li><code>scope[0]</code> 是最小值</li><li><code>scope[1]</code> 是最大值</li><li><code>step</code> 是步长</li><li>不传时默认 <code>0 ~ 10</code>，步长 <code>1</code></li></ul><p>例子在 <code>src/controllers/API/workflow.ts</code>：</p><p>LLM 节点 temperature：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  key: &quot;temperature&quot;,</span>
<span class="line">  label: &quot;温度&quot;,</span>
<span class="line">  type: &quot;slide&quot;,</span>
<span class="line">  scope: [0, 2],</span>
<span class="line">  step: 0.1,</span>
<span class="line">  value: 0.7</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Agent 节点 temperature 同样是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">scope: [0, 2],</span>
<span class="line">step: 0.1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>QA 知识库检索的相似度阈值：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  key: &quot;score&quot;,</span>
<span class="line">  type: &quot;slide&quot;,</span>
<span class="line">  value: 0.8,</span>
<span class="line">  scope: [0.01, 0.99],</span>
<span class="line">  step: 0.01</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Agent 聊天历史开关滑块：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  key: &quot;chat_history_flag&quot;,</span>
<span class="line">  type: &quot;slide_switch&quot;,</span>
<span class="line">  scope: [0, 100],</span>
<span class="line">  step: 1,</span>
<span class="line">  value: {</span>
<span class="line">    flag: true,</span>
<span class="line">    value: 50</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-number-char-number-由-min-max-定义-但前端没有主动-clamp" tabindex="-1"><a class="header-anchor" href="#_5-2-number-char-number-由-min-max-定义-但前端没有主动-clamp"><span>5.2 number / char_number：由 <code>min</code> / <code>max</code> 定义，但前端没有主动 clamp</span></a></h3><p>组件文件：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/FlowNode/component/InputItem.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>它把模板里的 <code>min/max</code> 传给 HTML input：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;Input</span>
<span class="line">  type={type}</span>
<span class="line">  min={data.min}</span>
<span class="line">  max={data.max}</span>
<span class="line">  onChange={(e) =&gt; handleChange(e.target.value)}</span>
<span class="line">/&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但注意，<code>handleChange</code> 主要是做数字过滤：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">const filteredValue = inputValue.replace(/[^\\d]/g, &#39;&#39;);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>也就是说它会过滤非数字字符，但<strong>没有显式把值 clamp 到 min/max 范围内</strong>。<code>min/max</code> 更多是浏览器 input 属性层面的限制，不是业务强校验。</p><p>例子：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  key: &quot;dialog_files_content_size&quot;,</span>
<span class="line">  label: &quot;文件内容长度上限&quot;,</span>
<span class="line">  type: &quot;char_number&quot;,</span>
<span class="line">  min: 0,</span>
<span class="line">  value: 15000</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>英文模板里还有：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  key: &quot;max_retrieval_count&quot;,</span>
<span class="line">  type: &quot;number&quot;,</span>
<span class="line">  min: 1,</span>
<span class="line">  max: 50,</span>
<span class="line">  value: 10</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-特殊组件内部硬编码范围" tabindex="-1"><a class="header-anchor" href="#_5-3-特殊组件内部硬编码范围"><span>5.3 特殊组件内部硬编码范围</span></a></h3><p>例如：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/FlowNode/component/HistoryNumItem.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>里面直接：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">min={0}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>并阻止 <code>-</code>、<code>e</code>、<code>+</code> 等输入。</p><p>再比如：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/FlowNode/component/RetrievalWeightSlider.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>检索权重滑块内部硬编码：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">min={0}</span>
<span class="line">max={1}</span>
<span class="line">step={0.01}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以有些范围来自 <code>workflow.ts</code> 模板，有些范围来自具体组件内部。</p><hr><h2 id="_6-模型选择不是普通-select" tabindex="-1"><a class="header-anchor" href="#_6-模型选择不是普通-select"><span>6. 模型选择不是普通 <code>select</code></span></a></h2><p>你的例子里写了：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">model: {</span>
<span class="line">  type: &quot;select&quot;,</span>
<span class="line">  ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但这套 FlowNode 里模型不是普通 <code>select</code>，而是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  key: &quot;model_id&quot;,</span>
<span class="line">  type: &quot;postwise_model&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者 Agent：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  key: &quot;model_id&quot;,</span>
<span class="line">  type: &quot;agent_model&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它们在：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/FlowNode/Parameter.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>被映射到：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;ModelItem /&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>组件文件：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/pages/BuildPage/flow/FlowNode/component/ModelItem.tsx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>ModelItem</code> 内部用 Cascader 渲染，并调用模型相关 API 获取选项：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">useModel(agent ? &#39;assistant&#39; : &#39;llm&#39;)</span>
<span class="line">getLlmDefaultModel()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>相关 API 在：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/controllers/API/finetune.ts</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>包括：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">GET /api/v1/llm</span>
<span class="line">GET /api/v1/llm/workflow</span>
<span class="line">GET /api/v1/llm/assistant/llm_list</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以：<strong>模型选项数据是接口拿的，但节点表单 schema 不是接口拿的。</strong></p><hr><h2 id="_7-我顺手发现的两个潜在不一致" tabindex="-1"><a class="header-anchor" href="#_7-我顺手发现的两个潜在不一致"><span>7. 我顺手发现的两个潜在不一致</span></a></h2><h3 id="_7-1-英文模板里有-type-select-但-flownode-没有对应渲染器" tabindex="-1"><a class="header-anchor" href="#_7-1-英文模板里有-type-select-但-flownode-没有对应渲染器"><span>7.1 英文模板里有 <code>type: &quot;select&quot;</code>，但 FlowNode 没有对应渲染器</span></a></h3><p>在 <code>src/controllers/API/workflow.ts</code> 英文模板附近有：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  key: &quot;result_reorder_strategy&quot;,</span>
<span class="line">  type: &quot;select&quot;,</span>
<span class="line">  ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但 <code>Parameter.tsx</code> 没有：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">case &quot;select&quot;:</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>所以如果这个参数真的展示出来，大概率会显示：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">Unsupported parameter type</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>除非它被某些条件隐藏了，或者这段模板没被实际用到。</p><h3 id="_7-2-英文模板里有-file-retriever-但后端映射是-knowledge-retriever" tabindex="-1"><a class="header-anchor" href="#_7-2-英文模板里有-file-retriever-但后端映射是-knowledge-retriever"><span>7.2 英文模板里有 <code>file_retriever</code>，但后端映射是 <code>knowledge_retriever</code></span></a></h3><p>中文模板里是：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">type: &quot;knowledge_retriever&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>后端也支持：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">NodeType.KNOWLEDGE_RETRIEVER.value: KnowledgeRetriever</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>但英文模板里我看到：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">type: &quot;file_retriever&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>而后端 <code>NodeType</code> / <code>NODE_CLASS_MAP</code> 里没有 <code>file_retriever</code>。 如果用户语言是英文并创建这个节点，运行时可能找不到后端执行类。</p><hr><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>可以这样理解这套架构：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">src/controllers/API/workflow.ts</span>
<span class="line">  前端硬编码工作流节点模板</span>
<span class="line">        ↓</span>
<span class="line">src/pages/BuildPage/flow/Sidebar.tsx</span>
<span class="line">  读取模板，渲染左侧节点</span>
<span class="line">        ↓</span>
<span class="line">src/pages/BuildPage/flow/Panne.tsx</span>
<span class="line">  拖拽生成 ReactFlow node，data = WorkflowNode</span>
<span class="line">        ↓</span>
<span class="line">src/pages/BuildPage/flow/FlowNode/index.tsx</span>
<span class="line">src/pages/BuildPage/flow/FlowNode/ParameterGroup.tsx</span>
<span class="line">src/pages/BuildPage/flow/FlowNode/Parameter.tsx</span>
<span class="line">  根据 group_params[].params[].type 渲染表单</span>
<span class="line">        ↓</span>
<span class="line">saveWorkflow / runWorkflowNodeApi</span>
<span class="line">  把整张 flow 或单节点 node.data 提交给后端</span>
<span class="line">        ↓</span>
<span class="line">backend/postwise/workflow/common/node.py</span>
<span class="line">  BaseNodeData 接收 group_params</span>
<span class="line">        ↓</span>
<span class="line">backend/postwise/workflow/nodes/node_manage.py</span>
<span class="line">  node.type -&gt; 后端执行类</span>
<span class="line">        ↓</span>
<span class="line">backend/postwise/workflow/nodes/base.py</span>
<span class="line">  group_params 扁平化为 self.node_params[key] = value</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以你的几个问题对应答案是：</p><ol><li><strong>节点模板/表单配置主文件</strong>：<code>src/controllers/API/workflow.ts</code>。</li><li><strong>FlowNode 表单渲染器</strong>：<code>src/pages/BuildPage/flow/FlowNode/Parameter.tsx</code>。</li><li><strong>后端节点类型到执行类映射</strong>：<code>backend/postwise/workflow/nodes/node_manage.py</code>。</li><li><strong>后端不会为这套 FlowNode 返回 <code>{ model: { type: &#39;select&#39; } }</code> 这种 schema</strong>；它消费的是前端保存的 <code>group_params</code>。</li><li><strong>取值范围主要在前端模板里通过 <code>scope/step/min/max</code> 定义</strong>，部分组件内部也有硬编码范围。</li></ol>`,167)])])}const r=s(i,[["render",t]]),c=JSON.parse(`{"path":"/posts/experiences/%E6%99%BA%E8%83%BD%E4%BD%93%E5%BC%80%E5%8F%91%E5%B9%B3%E5%8F%B0%E8%8A%82%E7%82%B9%E9%85%8D%E7%BD%AE%E9%80%BB%E8%BE%91.html","title":"智能体开发平台节点配置逻辑","lang":"zh-CN","frontmatter":{"date":"2026-09-17T00:00:00.000Z","category":["项目笔记"],"tag":["React"]},"headers":[{"level":2,"title":"1. 工作流节点“配置/模板”主要在哪个文件？","slug":"_1-工作流节点-配置-模板-主要在哪个文件","link":"#_1-工作流节点-配置-模板-主要在哪个文件","children":[]},{"level":2,"title":"2. FlowNode 目录下真正的“表单渲染器”在哪？","slug":"_2-flownode-目录下真正的-表单渲染器-在哪","link":"#_2-flownode-目录下真正的-表单渲染器-在哪","children":[]},{"level":2,"title":"3. 后端是否会返回 { model: { type: 'select' }, temperature: { type: 'number' } } 这种结构？","slug":"_3-后端是否会返回-model-type-select-temperature-type-number-这种结构","link":"#_3-后端是否会返回-model-type-select-temperature-type-number-这种结构","children":[]},{"level":2,"title":"4. 后端节点类型和执行类的映射在哪？","slug":"_4-后端节点类型和执行类的映射在哪","link":"#_4-后端节点类型和执行类的映射在哪","children":[]},{"level":2,"title":"5. 节点输入框的取值范围怎么定义？","slug":"_5-节点输入框的取值范围怎么定义","link":"#_5-节点输入框的取值范围怎么定义","children":[{"level":3,"title":"5.1 Slider 类：由模板里的 scope 和 step 定义","slug":"_5-1-slider-类-由模板里的-scope-和-step-定义","link":"#_5-1-slider-类-由模板里的-scope-和-step-定义","children":[]},{"level":3,"title":"5.2 number / char_number：由 min / max 定义，但前端没有主动 clamp","slug":"_5-2-number-char-number-由-min-max-定义-但前端没有主动-clamp","link":"#_5-2-number-char-number-由-min-max-定义-但前端没有主动-clamp","children":[]},{"level":3,"title":"5.3 特殊组件内部硬编码范围","slug":"_5-3-特殊组件内部硬编码范围","link":"#_5-3-特殊组件内部硬编码范围","children":[]}]},{"level":2,"title":"6. 模型选择不是普通 select","slug":"_6-模型选择不是普通-select","link":"#_6-模型选择不是普通-select","children":[]},{"level":2,"title":"7. 我顺手发现的两个潜在不一致","slug":"_7-我顺手发现的两个潜在不一致","link":"#_7-我顺手发现的两个潜在不一致","children":[{"level":3,"title":"7.1 英文模板里有 type: \\"select\\"，但 FlowNode 没有对应渲染器","slug":"_7-1-英文模板里有-type-select-但-flownode-没有对应渲染器","link":"#_7-1-英文模板里有-type-select-但-flownode-没有对应渲染器","children":[]},{"level":3,"title":"7.2 英文模板里有 file_retriever，但后端映射是 knowledge_retriever","slug":"_7-2-英文模板里有-file-retriever-但后端映射是-knowledge-retriever","link":"#_7-2-英文模板里有-file-retriever-但后端映射是-knowledge-retriever","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"updatedTime":1789792022000,"contributors":[{"name":"ksldnasx","username":"ksldnasx","email":"wh8261408@126.com","commits":1,"url":"https://github.com/ksldnasx"}],"changelog":[{"hash":"2179440391d9bbebc2d14f008b6f8971406a4e31","time":1789792022000,"email":"wh8261408@126.com","author":"ksldnasx","message":"feat:算法题hot100"}]},"filePathRelative":"posts/experiences/智能体开发平台节点配置逻辑.md","excerpt":"\\n<blockquote>\\n<p>对应仓库:    Code\\\\newfish\\\\postwise_main\\\\postwise\\\\src\\\\frontend\\\\platform\\\\src\\\\pages\\\\BuildPage：</p>\\n</blockquote>\\n<p>我按“只读源码、不启动后端”的方式看了一遍。结论先说：</p>\\n<p><strong>\`src/pages/BuildPage/flow/FlowNode\` 这套工作流节点，并不是由后端实时返回一份 \`{ model: { type: 'select' }, temperature: { type: 'number' } }\` 这样的表单 schema 来驱动的。</strong>\\n它的节点模板主要是<strong>前端硬编码</strong>在 <code>src/controllers/API/workflow.ts</code> 里；前端根据 <code>group_params[].params[].type</code> 做表单组件分发；后端主要负责<strong>保存整张 flow JSON</strong>，运行时根据 <code>node.data.type</code> 找到对应后端节点类，并把 <code>group_params</code> 里的 <code>key/value</code> 扁平化成运行参数。</p>"}`);export{r as comp,c as data};
