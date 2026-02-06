import{_ as n,c as e,a,o as i}from"./app-UmXydJji.js";const l={};function t(p,s){return i(),e("div",null,[...s[0]||(s[0]=[a(`<h1 id="硅谷甄选运营平台" tabindex="-1"><a class="header-anchor" href="#硅谷甄选运营平台"><span>硅谷甄选运营平台</span></a></h1><p>此次教学课程为硅谷甄选运营平台项目,包含运营平台项目模板从0到1开发，以及数据大屏幕、权限等业务。</p><p>此次教学课程涉及到技术栈包含 <strong>:vue3+TypeScript+vue-router+pinia+element-plus+axios+echarts</strong> 等技术栈。</p><h2 id="一、vue3组件通信方式" tabindex="-1"><a class="header-anchor" href="#一、vue3组件通信方式"><span>一、vue3组件通信方式</span></a></h2><p><strong>通信仓库地址:https://gitee.com/jch1011/vue3_communication.git</strong></p><p>不管是vue2还是vue3,组件通信方式很重要,不管是项目还是面试都是经常用到的知识点。</p><p><strong>比如:vue2组件通信方式</strong></p><p><strong>props:</strong> 可以实现父子组件、子父组件、甚至兄弟组件通信</p><p><strong>自定义事件:</strong> 可以实现子父组件通信</p><p><strong>全局事件总线$bus:</strong> 可以实现任意组件通信</p><p><strong>pubsub:</strong> 发布订阅模式实现任意组件通信</p><p><strong>vuex</strong>:集中式状态管理容器，实现任意组件通信</p><p><strong>ref</strong>:父组件获取子组件实例VC,获取子组件的响应式数据以及方法</p><p><strong>slot:</strong> 插槽(默认插槽、具名插槽、作用域插槽)实现父子组件通信........</p><h3 id="_1-1props" tabindex="-1"><a class="header-anchor" href="#_1-1props"><span>1.1props</span></a></h3><p>props可以实现父子组件通信,在vue3中我们可以通过defineProps获取父组件传递的数据。且在组件内部不需要引入defineProps方法可以直接使用！</p><p><strong>父组件给子组件传递数据</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;!-- 父组件文件 --&gt;</span>
<span class="line">&lt;Child info=&quot;我爱祖国&quot; :money=&quot;money&quot;&gt;&lt;/Child&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>子组件获取父组件传递数据:方式1</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;!-- 子组件文件 --&gt;</span>
<span class="line">let props = defineProps({</span>
<span class="line">  info:{</span>
<span class="line">   type:String,//接受的数据类型</span>
<span class="line">   default:&#39;默认参数&#39;,//接受默认数据</span>
<span class="line">  },</span>
<span class="line">  money:{</span>
<span class="line">   type:Number,</span>
<span class="line">   default:0</span>
<span class="line">}})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>子组件获取父组件传递数据:方式2</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">let props = defineProps([&quot;info&quot;,&#39;money&#39;]);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>子组件获取到props数据就可以在模板中使用了,但是切记props是只读的(只能读取，不能修改)</p><h3 id="_1-2自定义事件" tabindex="-1"><a class="header-anchor" href="#_1-2自定义事件"><span>1.2自定义事件</span></a></h3><p>在vue框架中事件分为两种:一种是原生的DOM事件，另外一种自定义事件。</p><p>原生DOM事件可以让用户与网页进行交互，比如click、dbclick、change、mouseenter、mouseleave....</p><p>自定义事件可以实现子组件给父组件传递数据</p><h4 id="_1-2-1原生dom事件" tabindex="-1"><a class="header-anchor" href="#_1-2-1原生dom事件"><span>1.2.1原生DOM事件</span></a></h4><p>代码如下:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"> &lt;pre @click=&quot;handler&quot;&gt;</span>
<span class="line">      我是祖国的老花骨朵</span>
<span class="line"> &lt;/pre&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当前代码级给pre标签绑定原生DOM事件点击事件,默认会给事件回调注入event事件对象。当然点击事件想注入多个参数可以按照下图操作。但是切记注入的事件对象务必叫做$event.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">  &lt;div @click=&quot;handler1(1,2,3,$event)&quot;&gt;我要传递多个参数&lt;/div&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在vue3框架click、dbclick、change(这类原生DOM事件),不管是在标签、自定义标签上(组件标签)都是原生DOM事件。</p><p><strong></strong></p><h4 id="_1-2-2自定义事件" tabindex="-1"><a class="header-anchor" href="#_1-2-2自定义事件"><span>1.2.2自定义事件</span></a></h4><p>自定义事件可以实现子组件给父组件传递数据.在项目中是比较常用的。</p><p>比如在父组件内部给子组件(Event2)绑定一个自定义事件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;Event2  @xxx=&quot;handler3&quot;&gt;&lt;/Event2&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在Event2子组件内部触发这个自定义事件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;h1&gt;我是子组件2&lt;/h1&gt;</span>
<span class="line">    &lt;button @click=&quot;handler&quot;&gt;点击我触发xxx自定义事件&lt;/button&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line"></span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">let $emit = defineEmits([&quot;xxx&quot;]);</span>
<span class="line">const handler = () =&gt; {</span>
<span class="line">  $emit(&quot;xxx&quot;, &quot;法拉利&quot;, &quot;茅台&quot;);</span>
<span class="line">};</span>
<span class="line">&lt;/script&gt;</span>
<span class="line">&lt;style scoped&gt;</span>
<span class="line">&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们会发现在script标签内部,使用了defineEmits方法，此方法是vue3提供的方法,不需要引入直接使用。defineEmits方法执行，传递一个数组，数组元素即为将来组件需要触发的自定义事件类型，此方执行会返回一个$emit方法用于触发自定义事件。</p><p>当点击按钮的时候，事件回调内部调用$emit方法去触发自定义事件,第一个参数为触发事件类型，第二个、三个、N个参数即为传递给父组件的数据。</p><p>需要注意的是:代码如下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;Event2  @xxx=&quot;handler3&quot; @click=&quot;handler&quot;&gt;&lt;/Event2&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>正常说组件标签书写@click应该为原生DOM事件,但是如果子组件内部通过defineEmits定义就变为自定义事件了</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">let $emit = defineEmits([&quot;xxx&quot;,&#39;click&#39;]);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-3全局事件总线" tabindex="-1"><a class="header-anchor" href="#_1-3全局事件总线"><span>1.3全局事件总线</span></a></h3><p>全局事件总线可以实现任意组件通信，在vue2中可以根据VM与VC关系推出全局事件总线。</p><p>但是在vue3中没有Vue构造函数，也就没有Vue.prototype.以及组合式API写法没有this，</p><p>那么在Vue3想实现全局事件的总线功能就有点不现实啦，如果想在Vue3中使用全局事件总线功能</p><p>可以使用插件mitt实现。</p><p><strong>mitt:官网地址:https://www.npmjs.com/package/mitt</strong></p><h3 id="_1-4v-model" tabindex="-1"><a class="header-anchor" href="#_1-4v-model"><span>1.4v-model</span></a></h3><p>v-model指令可是收集表单数据(数据双向绑定)，除此之外它也可以实现父子组件数据同步。</p><p>而v-model实指利用props[modelValue]与自定义事件[update:modelValue]实现的。</p><p>下方代码:相当于给组件Child传递一个props(modelValue)与绑定一个自定义事件update:modelValue</p><p>实现父子组件数据同步</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;Child v-model=&quot;msg&quot;&gt;&lt;/Child&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在vue3中一个组件可以通过使用多个v-model,让父子组件多个数据同步,下方代码相当于给组件Child传递两个props分别是pageNo与pageSize，以及绑定两个自定义事件update:pageNo与update:pageSize实现父子数据同步</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;Child v-model:pageNo=&quot;msg&quot; v-model:pageSize=&quot;msg1&quot;&gt;&lt;/Child&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5useattrs" tabindex="-1"><a class="header-anchor" href="#_1-5useattrs"><span>1.5useAttrs</span></a></h3><p>在Vue3中可以利用useAttrs方法获取组件的属性与事件(包含:原生DOM事件或者自定义事件),次函数功能类似于Vue2框架中$attrs属性与$listeners方法。</p><p>比如:在父组件内部使用一个子组件my-button</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;my-button type=&quot;success&quot; size=&quot;small&quot; title=&#39;标题&#39; @click=&quot;handler&quot;&gt;&lt;/my-button&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>子组件内部可以通过useAttrs方法获取组件属性与事件.因此你也发现了，它类似于props,可以接受父组件传递过来的属性与属性值。需要注意如果defineProps接受了某一个属性，useAttrs方法返回的对象身上就没有相应属性与属性值。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">import {useAttrs} from &#39;vue&#39;;</span>
<span class="line">let $attrs = useAttrs();</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6ref与-parent" tabindex="-1"><a class="header-anchor" href="#_1-6ref与-parent"><span>1.6ref与$parent</span></a></h3><p>ref,提及到ref可能会想到它可以获取元素的DOM或者获取子组件实例的VC。既然可以在父组件内部通过ref获取子组件实例VC，那么子组件内部的方法与响应式数据父组件可以使用的。</p><p>比如:在父组件挂载完毕获取组件实例</p><p>父组件内部代码:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;h1&gt;ref与$parent&lt;/h1&gt;</span>
<span class="line">    &lt;Son ref=&quot;son&quot;&gt;&lt;/Son&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">import Son from &quot;./Son.vue&quot;;</span>
<span class="line">import { onMounted, ref } from &quot;vue&quot;;</span>
<span class="line">const son = ref();</span>
<span class="line">onMounted(() =&gt; {</span>
<span class="line">  console.log(son.value);</span>
<span class="line">});</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是需要注意，如果想让父组件获取子组件的数据或者方法需要通过defineExpose对外暴露,因为vue3中组件内部的数据对外“关闭的”，外部不能访问</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">import { ref } from &quot;vue&quot;;</span>
<span class="line">//数据</span>
<span class="line">let money = ref(1000);</span>
<span class="line">//方法</span>
<span class="line">const handler = ()=&gt;{</span>
<span class="line">}</span>
<span class="line">defineExpose({</span>
<span class="line">  money,</span>
<span class="line">   handler</span>
<span class="line">})</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>$parent可以获取某一个组件的父组件实例VC,因此可以使用父组件内部的数据与方法。必须子组件内部拥有一个按钮点击时候获取父组件实例，当然父组件的数据与方法需要通过defineExpose方法对外暴露</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;button @click=&quot;handler($parent)&quot;&gt;点击我获取父组件实例&lt;/button&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-7provide与inject" tabindex="-1"><a class="header-anchor" href="#_1-7provide与inject"><span>1.7provide与inject</span></a></h3><p><strong>provide[提供]</strong></p><p><strong>inject[注入]</strong></p><p>vue3提供两个方法provide与inject,可以实现隔辈组件传递参数</p><p>组件组件提供数据:</p><p>provide方法用于提供数据，此方法执需要传递两个参数,分别提供数据的key与提供数据value</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">import {provide} from &#39;vue&#39;</span>
<span class="line">provide(&#39;token&#39;,&#39;admin_token&#39;);</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后代组件可以通过inject方法获取数据,通过key获取存储的数值</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">import {inject} from &#39;vue&#39;</span>
<span class="line">let token = inject(&#39;token&#39;);</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-8pinia" tabindex="-1"><a class="header-anchor" href="#_1-8pinia"><span>1.8pinia</span></a></h3><p><strong>pinia官网:https://pinia.web3doc.top/</strong></p><p>pinia也是集中式管理状态容器,类似于vuex。但是核心概念没有mutation、modules,使用方式参照官网</p><h3 id="_1-9slot" tabindex="-1"><a class="header-anchor" href="#_1-9slot"><span>1.9slot</span></a></h3><p>插槽：默认插槽、具名插槽、作用域插槽可以实现父子组件通信.</p><p><strong>默认插槽:</strong></p><p>在子组件内部的模板中书写slot全局组件标签</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;slot&gt;&lt;/slot&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line">&lt;style scoped&gt;</span>
<span class="line">&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在父组件内部提供结构：Todo即为子组件,在父组件内部使用的时候，在双标签内部书写结构传递给子组件</p><p>注意开发项目的时候默认插槽一般只有一个</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;Todo&gt;</span>
<span class="line">  &lt;h1&gt;我是默认插槽填充的结构&lt;/h1&gt;</span>
<span class="line">&lt;/Todo&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>具名插槽：</strong></p><p>顾名思义，此插槽带有名字在组件内部留多个指定名字的插槽。</p><p>下面是一个子组件内部,模板中留两个插槽</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;h1&gt;todo&lt;/h1&gt;</span>
<span class="line">    &lt;slot name=&quot;a&quot;&gt;&lt;/slot&gt;</span>
<span class="line">    &lt;slot name=&quot;b&quot;&gt;&lt;/slot&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;style scoped&gt;</span>
<span class="line">&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父组件内部向指定的具名插槽传递结构。需要注意v-slot：可以替换为#</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;h1&gt;slot&lt;/h1&gt;</span>
<span class="line">    &lt;Todo&gt;</span>
<span class="line">      &lt;template v-slot:a&gt;  //可以用#a替换</span>
<span class="line">        &lt;div&gt;填入组件A部分的结构&lt;/div&gt;</span>
<span class="line">      &lt;/template&gt;</span>
<span class="line">      &lt;template v-slot:b&gt;//可以用#b替换</span>
<span class="line">        &lt;div&gt;填入组件B部分的结构&lt;/div&gt;</span>
<span class="line">      &lt;/template&gt;</span>
<span class="line">    &lt;/Todo&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line"></span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">import Todo from &quot;./Todo.vue&quot;;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line">&lt;style scoped&gt;</span>
<span class="line">&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作用域插槽</strong></p><p>作用域插槽：可以理解为，子组件数据由父组件提供，但是子组件内部决定不了自身结构与外观(样式)</p><p>子组件Todo代码如下:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;h1&gt;todo&lt;/h1&gt;</span>
<span class="line">    &lt;ul&gt;</span>
<span class="line">     &lt;!--组件内部遍历数组--&gt;</span>
<span class="line">      &lt;li v-for=&quot;(item,index) in todos&quot; :key=&quot;item.id&quot;&gt;</span>
<span class="line">         &lt;!--作用域插槽将数据回传给父组件--&gt;</span>
<span class="line">         &lt;slot :$row=&quot;item&quot; :$index=&quot;index&quot;&gt;&lt;/slot&gt;</span>
<span class="line">      &lt;/li&gt;</span>
<span class="line">    &lt;/ul&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">defineProps([&#39;todos&#39;]);//接受父组件传递过来的数据</span>
<span class="line">&lt;/script&gt;</span>
<span class="line">&lt;style scoped&gt;</span>
<span class="line">&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父组件内部代码如下:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;h1&gt;slot&lt;/h1&gt;</span>
<span class="line">    &lt;Todo :todos=&quot;todos&quot;&gt;</span>
<span class="line">      &lt;template v-slot=&quot;{$row,$index}&quot;&gt;</span>
<span class="line">         &lt;!--父组件决定子组件的结构与外观--&gt;</span>
<span class="line">         &lt;span :style=&quot;{color:$row.done?&#39;green&#39;:&#39;red&#39;}&quot;&gt;{{$row.title}}&lt;/span&gt;</span>
<span class="line">      &lt;/template&gt;</span>
<span class="line">    &lt;/Todo&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line"></span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">import Todo from &quot;./Todo.vue&quot;;</span>
<span class="line">import { ref } from &quot;vue&quot;;</span>
<span class="line">//父组件内部数据</span>
<span class="line">let todos = ref([</span>
<span class="line">  { id: 1, title: &quot;吃饭&quot;, done: true },</span>
<span class="line">  { id: 2, title: &quot;睡觉&quot;, done: false },</span>
<span class="line">  { id: 3, title: &quot;打豆豆&quot;, done: true },</span>
<span class="line">]);</span>
<span class="line">&lt;/script&gt;</span>
<span class="line">&lt;style scoped&gt;</span>
<span class="line">&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、搭建后台管理系统模板" tabindex="-1"><a class="header-anchor" href="#二、搭建后台管理系统模板"><span>二、搭建后台管理系统模板</span></a></h2><h3 id="_2-1项目初始化" tabindex="-1"><a class="header-anchor" href="#_2-1项目初始化"><span>2.1项目初始化</span></a></h3><p>今天来带大家从0开始搭建一个vue3版本的后台管理系统。一个项目要有统一的规范，需要使用eslint+stylelint+prettier来对我们的代码质量做检测和修复，需要使用husky来做commit拦截，需要使用commitlint来统一提交规范，需要使用preinstall来统一包管理工具。</p><p>下面我们就用这一套规范来初始化我们的项目，集成一个规范的模版。</p><h4 id="_2-1-1环境准备" tabindex="-1"><a class="header-anchor" href="#_2-1-1环境准备"><span>2.1.1环境准备</span></a></h4><ul><li>node v16.14.2</li><li>pnpm 8.0.0</li></ul><h4 id="_2-1-2初始化项目" tabindex="-1"><a class="header-anchor" href="#_2-1-2初始化项目"><span>2.1.2初始化项目</span></a></h4><p>本项目使用vite进行构建，vite官方中文文档参考：<a href="https://cn.vitejs.dev/guide/" target="_blank" rel="noopener noreferrer">cn.vitejs.dev/guide/</a></p><p><strong>pnpm:performant npm ，意味“高性能的 npm”。<a href="https://so.csdn.net/so/search?q=pnpm&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">pnpm</a>由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”</strong></p><p>pnpm安装指令</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">npm i -g pnpm</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>项目初始化命令:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm create vite</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>进入到项目根目录pnpm install安装全部依赖.安装完依赖运行程序:pnpm run dev</p><p>运行完毕项目跑在http://127.0.0.1:5173/,可以访问你得项目啦</p><h3 id="_2-2项目配置" tabindex="-1"><a class="header-anchor" href="#_2-2项目配置"><span>2.2项目配置</span></a></h3><h4 id="一、eslint配置" tabindex="-1"><a class="header-anchor" href="#一、eslint配置"><span>一、eslint配置</span></a></h4><p><strong>eslint中文官网:http://eslint.cn/</strong></p><p>ESLint最初是由<a href="http://nczonline.net/" target="_blank" rel="noopener noreferrer">Nicholas C. Zakas</a> 于2013年6月创建的开源项目。它的目标是提供一个插件化的<strong>javascript代码检测工具</strong></p><p>首先安装eslint</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm i eslint -D</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>生成配置文件:.eslint.cjs</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">npx eslint --init</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>.eslint.cjs配置文件</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">module.exports = {</span>
<span class="line">   //运行环境</span>
<span class="line">    &quot;env&quot;: { </span>
<span class="line">        &quot;browser&quot;: true,//浏览器端</span>
<span class="line">        &quot;es2021&quot;: true,//es2021</span>
<span class="line">    },</span>
<span class="line">    //规则继承</span>
<span class="line">    &quot;extends&quot;: [ </span>
<span class="line">       //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档</span>
<span class="line">       //比如:函数不能重名、对象不能出现重复key</span>
<span class="line">        &quot;eslint:recommended&quot;,</span>
<span class="line">        //vue3语法规则</span>
<span class="line">        &quot;plugin:vue/vue3-essential&quot;,</span>
<span class="line">        //ts语法规则</span>
<span class="line">        &quot;plugin:@typescript-eslint/recommended&quot;</span>
<span class="line">    ],</span>
<span class="line">    //要为特定类型的文件指定处理器</span>
<span class="line">    &quot;overrides&quot;: [</span>
<span class="line">    ],</span>
<span class="line">    //指定解析器:解析器</span>
<span class="line">    //Esprima 默认解析器</span>
<span class="line">    //Babel-ESLint babel解析器</span>
<span class="line">    //@typescript-eslint/parser ts解析器</span>
<span class="line">    &quot;parser&quot;: &quot;@typescript-eslint/parser&quot;,</span>
<span class="line">    //指定解析器选项</span>
<span class="line">    &quot;parserOptions&quot;: {</span>
<span class="line">        &quot;ecmaVersion&quot;: &quot;latest&quot;,//校验ECMA最新版本</span>
<span class="line">        &quot;sourceType&quot;: &quot;module&quot;//设置为&quot;script&quot;（默认），或者&quot;module&quot;代码在ECMAScript模块中</span>
<span class="line">    },</span>
<span class="line">    //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它</span>
<span class="line">    //该eslint-plugin-前缀可以从插件名称被省略</span>
<span class="line">    &quot;plugins&quot;: [</span>
<span class="line">        &quot;vue&quot;,</span>
<span class="line">        &quot;@typescript-eslint&quot;</span>
<span class="line">    ],</span>
<span class="line">    //eslint规则</span>
<span class="line">    &quot;rules&quot;: {</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_1-1vue3环境代码校验插件" tabindex="-1"><a class="header-anchor" href="#_1-1vue3环境代码校验插件"><span>1.1vue3环境代码校验插件</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"># 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查</span>
<span class="line">&quot;eslint-config-prettier&quot;: &quot;^8.6.0&quot;,</span>
<span class="line">&quot;eslint-plugin-import&quot;: &quot;^2.27.5&quot;,</span>
<span class="line">&quot;eslint-plugin-node&quot;: &quot;^11.1.0&quot;,</span>
<span class="line"># 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低</span>
<span class="line">&quot;eslint-plugin-prettier&quot;: &quot;^4.2.1&quot;,</span>
<span class="line"># vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南</span>
<span class="line">&quot;eslint-plugin-vue&quot;: &quot;^9.9.0&quot;,</span>
<span class="line"># 该解析器允许使用Eslint校验所有babel code</span>
<span class="line">&quot;@babel/eslint-parser&quot;: &quot;^7.19.1&quot;,</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装指令</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h5 id="_1-2修改-eslintrc-cjs配置文件" tabindex="-1"><a class="header-anchor" href="#_1-2修改-eslintrc-cjs配置文件"><span>1.2修改.eslintrc.cjs配置文件</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// @see https://eslint.bootcss.com/docs/rules/</span>
<span class="line"></span>
<span class="line">module.exports = {</span>
<span class="line">  env: {</span>
<span class="line">    browser: true,</span>
<span class="line">    es2021: true,</span>
<span class="line">    node: true,</span>
<span class="line">    jest: true,</span>
<span class="line">  },</span>
<span class="line">  /* 指定如何解析语法 */</span>
<span class="line">  parser: &#39;vue-eslint-parser&#39;,</span>
<span class="line">  /** 优先级低于 parse 的语法解析配置 */</span>
<span class="line">  parserOptions: {</span>
<span class="line">    ecmaVersion: &#39;latest&#39;,</span>
<span class="line">    sourceType: &#39;module&#39;,</span>
<span class="line">    parser: &#39;@typescript-eslint/parser&#39;,</span>
<span class="line">    jsxPragma: &#39;React&#39;,</span>
<span class="line">    ecmaFeatures: {</span>
<span class="line">      jsx: true,</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">  /* 继承已有的规则 */</span>
<span class="line">  extends: [</span>
<span class="line">    &#39;eslint:recommended&#39;,</span>
<span class="line">    &#39;plugin:vue/vue3-essential&#39;,</span>
<span class="line">    &#39;plugin:@typescript-eslint/recommended&#39;,</span>
<span class="line">    &#39;plugin:prettier/recommended&#39;,</span>
<span class="line">  ],</span>
<span class="line">  plugins: [&#39;vue&#39;, &#39;@typescript-eslint&#39;],</span>
<span class="line">  /*</span>
<span class="line">   * &quot;off&quot; 或 0    ==&gt;  关闭规则</span>
<span class="line">   * &quot;warn&quot; 或 1   ==&gt;  打开的规则作为警告（不影响代码执行）</span>
<span class="line">   * &quot;error&quot; 或 2  ==&gt;  规则作为一个错误（代码不能执行，界面报错）</span>
<span class="line">   */</span>
<span class="line">  rules: {</span>
<span class="line">    // eslint（https://eslint.bootcss.com/docs/rules/）</span>
<span class="line">    &#39;no-var&#39;: &#39;error&#39;, // 要求使用 let 或 const 而不是 var</span>
<span class="line">    &#39;no-multiple-empty-lines&#39;: [&#39;warn&#39;, { max: 1 }], // 不允许多个空行</span>
<span class="line">    &#39;no-console&#39;: process.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39; : &#39;off&#39;,</span>
<span class="line">    &#39;no-debugger&#39;: process.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39; : &#39;off&#39;,</span>
<span class="line">    &#39;no-unexpected-multiline&#39;: &#39;error&#39;, // 禁止空余的多行</span>
<span class="line">    &#39;no-useless-escape&#39;: &#39;off&#39;, // 禁止不必要的转义字符</span>
<span class="line"></span>
<span class="line">    // typeScript (https://typescript-eslint.io/rules)</span>
<span class="line">    &#39;@typescript-eslint/no-unused-vars&#39;: &#39;error&#39;, // 禁止定义未使用的变量</span>
<span class="line">    &#39;@typescript-eslint/prefer-ts-expect-error&#39;: &#39;error&#39;, // 禁止使用 @ts-ignore</span>
<span class="line">    &#39;@typescript-eslint/no-explicit-any&#39;: &#39;off&#39;, // 禁止使用 any 类型</span>
<span class="line">    &#39;@typescript-eslint/no-non-null-assertion&#39;: &#39;off&#39;,</span>
<span class="line">    &#39;@typescript-eslint/no-namespace&#39;: &#39;off&#39;, // 禁止使用自定义 TypeScript 模块和命名空间。</span>
<span class="line">    &#39;@typescript-eslint/semi&#39;: &#39;off&#39;,</span>
<span class="line"></span>
<span class="line">    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)</span>
<span class="line">    &#39;vue/multi-word-component-names&#39;: &#39;off&#39;, // 要求组件名称始终为 “-” 链接的单词</span>
<span class="line">    &#39;vue/script-setup-uses-vars&#39;: &#39;error&#39;, // 防止&lt;script setup&gt;使用的变量&lt;template&gt;被标记为未使用</span>
<span class="line">    &#39;vue/no-mutating-props&#39;: &#39;off&#39;, // 不允许组件 prop的改变</span>
<span class="line">    &#39;vue/attribute-hyphenation&#39;: &#39;off&#39;, // 对模板中的自定义组件强制执行属性命名样式</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_1-3-eslintignore忽略文件" tabindex="-1"><a class="header-anchor" href="#_1-3-eslintignore忽略文件"><span>1.3.eslintignore忽略文件</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">dist</span>
<span class="line">node_modules</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_1-4运行脚本" tabindex="-1"><a class="header-anchor" href="#_1-4运行脚本"><span>1.4运行脚本</span></a></h5><p>package.json新增两个运行脚本</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&quot;scripts&quot;: {</span>
<span class="line">    &quot;lint&quot;: &quot;eslint src&quot;,</span>
<span class="line">    &quot;fix&quot;: &quot;eslint src --fix&quot;,</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="二、配置prettier" tabindex="-1"><a class="header-anchor" href="#二、配置prettier"><span>二、配置<strong>prettier</strong></span></a></h4><p>有了eslint，为什么还要有prettier？eslint针对的是javascript，他是一个检测工具，包含js语法以及少部分格式问题，在eslint看来，语法对了就能保证代码正常运行，格式问题属于其次；</p><p>而prettier属于格式化工具，它看不惯格式不统一，所以它就把eslint没干好的事接着干，另外，prettier支持</p><p>包含js在内的多种语言。</p><p>总结起来，<strong>eslint和prettier这俩兄弟一个保证js代码质量，一个保证代码美观。</strong></p><h5 id="_2-1安装依赖包" tabindex="-1"><a class="header-anchor" href="#_2-1安装依赖包"><span>2.1安装依赖包</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h5 id="_2-2-prettierrc-json添加规则" tabindex="-1"><a class="header-anchor" href="#_2-2-prettierrc-json添加规则"><span>2.2.prettierrc.json添加规则</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">{</span>
<span class="line">  &quot;singleQuote&quot;: true,</span>
<span class="line">  &quot;semi&quot;: false,</span>
<span class="line">  &quot;bracketSpacing&quot;: true,</span>
<span class="line">  &quot;htmlWhitespaceSensitivity&quot;: &quot;ignore&quot;,</span>
<span class="line">  &quot;endOfLine&quot;: &quot;auto&quot;,</span>
<span class="line">  &quot;trailingComma&quot;: &quot;all&quot;,</span>
<span class="line">  &quot;tabWidth&quot;: 2</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-3-prettierignore忽略文件" tabindex="-1"><a class="header-anchor" href="#_2-3-prettierignore忽略文件"><span>2.3.prettierignore忽略文件</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">/dist/*</span>
<span class="line">/html/*</span>
<span class="line">.local</span>
<span class="line">/node_modules/**</span>
<span class="line">**/*.svg</span>
<span class="line">**/*.sh</span>
<span class="line">/public/*</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过pnpm run lint去检测语法，如果出现不规范格式,通过pnpm run fix 修改</strong></p><h4 id="三、配置stylelint" tabindex="-1"><a class="header-anchor" href="#三、配置stylelint"><span>三、配置stylelint</span></a></h4><p><a href="https://stylelint.io/" target="_blank" rel="noopener noreferrer">stylelint</a>为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。</p><p>我们的项目中使用scss作为预处理器，安装以下依赖：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h5 id="_3-1-stylelintrc-cjs配置文件" tabindex="-1"><a class="header-anchor" href="#_3-1-stylelintrc-cjs配置文件"><span>3.1<code>.stylelintrc.cjs</code><strong>配置文件</strong></span></a></h5><p><strong>官网:https://stylelint.bootcss.com/</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// @see https://stylelint.bootcss.com/</span>
<span class="line"></span>
<span class="line">module.exports = {</span>
<span class="line">  extends: [</span>
<span class="line">    &#39;stylelint-config-standard&#39;, // 配置stylelint拓展插件</span>
<span class="line">    &#39;stylelint-config-html/vue&#39;, // 配置 vue 中 template 样式格式化</span>
<span class="line">    &#39;stylelint-config-standard-scss&#39;, // 配置stylelint scss插件</span>
<span class="line">    &#39;stylelint-config-recommended-vue/scss&#39;, // 配置 vue 中 scss 样式格式化</span>
<span class="line">    &#39;stylelint-config-recess-order&#39;, // 配置stylelint css属性书写顺序插件,</span>
<span class="line">    &#39;stylelint-config-prettier&#39;, // 配置stylelint和prettier兼容</span>
<span class="line">  ],</span>
<span class="line">  overrides: [</span>
<span class="line">    {</span>
<span class="line">      files: [&#39;**/*.(scss|css|vue|html)&#39;],</span>
<span class="line">      customSyntax: &#39;postcss-scss&#39;,</span>
<span class="line">    },</span>
<span class="line">    {</span>
<span class="line">      files: [&#39;**/*.(html|vue)&#39;],</span>
<span class="line">      customSyntax: &#39;postcss-html&#39;,</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">  ignoreFiles: [</span>
<span class="line">    &#39;**/*.js&#39;,</span>
<span class="line">    &#39;**/*.jsx&#39;,</span>
<span class="line">    &#39;**/*.tsx&#39;,</span>
<span class="line">    &#39;**/*.ts&#39;,</span>
<span class="line">    &#39;**/*.json&#39;,</span>
<span class="line">    &#39;**/*.md&#39;,</span>
<span class="line">    &#39;**/*.yaml&#39;,</span>
<span class="line">  ],</span>
<span class="line">  /**</span>
<span class="line">   * null  =&gt; 关闭该规则</span>
<span class="line">   * always =&gt; 必须</span>
<span class="line">   */</span>
<span class="line">  rules: {</span>
<span class="line">    &#39;value-keyword-case&#39;: null, // 在 css 中使用 v-bind，不报错</span>
<span class="line">    &#39;no-descending-specificity&#39;: null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器</span>
<span class="line">    &#39;function-url-quotes&#39;: &#39;always&#39;, // 要求或禁止 URL 的引号 &quot;always(必须加上引号)&quot;|&quot;never(没有引号)&quot;</span>
<span class="line">    &#39;no-empty-source&#39;: null, // 关闭禁止空源码</span>
<span class="line">    &#39;selector-class-pattern&#39;: null, // 关闭强制选择器类名的格式</span>
<span class="line">    &#39;property-no-unknown&#39;: null, // 禁止未知的属性(true 为不允许)</span>
<span class="line">    &#39;block-opening-brace-space-before&#39;: &#39;always&#39;, //大括号之前必须有一个空格或不能有空白符</span>
<span class="line">    &#39;value-no-vendor-prefix&#39;: null, // 关闭 属性值前缀 --webkit-box</span>
<span class="line">    &#39;property-no-vendor-prefix&#39;: null, // 关闭 属性前缀 -webkit-mask</span>
<span class="line">    &#39;selector-pseudo-class-no-unknown&#39;: [</span>
<span class="line">      // 不允许未知的选择器</span>
<span class="line">      true,</span>
<span class="line">      {</span>
<span class="line">        ignorePseudoClasses: [&#39;global&#39;, &#39;v-deep&#39;, &#39;deep&#39;], // 忽略属性，修改element默认样式的时候能使用到</span>
<span class="line">      },</span>
<span class="line">    ],</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-2-stylelintignore忽略文件" tabindex="-1"><a class="header-anchor" href="#_3-2-stylelintignore忽略文件"><span>3.2.stylelintignore忽略文件</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">/node_modules/*</span>
<span class="line">/dist/*</span>
<span class="line">/html/*</span>
<span class="line">/public/*</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-3运行脚本" tabindex="-1"><a class="header-anchor" href="#_3-3运行脚本"><span>3.3运行脚本</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&quot;scripts&quot;: {</span>
<span class="line">	&quot;lint:style&quot;: &quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后配置统一的prettier来格式化我们的js和css，html代码</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"> &quot;scripts&quot;: {</span>
<span class="line">    &quot;dev&quot;: &quot;vite --open&quot;,</span>
<span class="line">    &quot;build&quot;: &quot;vue-tsc &amp;&amp; vite build&quot;,</span>
<span class="line">    &quot;preview&quot;: &quot;vite preview&quot;,</span>
<span class="line">    &quot;lint&quot;: &quot;eslint src&quot;,</span>
<span class="line">    &quot;fix&quot;: &quot;eslint src --fix&quot;,</span>
<span class="line">    &quot;format&quot;: &quot;prettier --write \\&quot;./**/*.{html,vue,ts,js,json,md}\\&quot;&quot;,</span>
<span class="line">    &quot;lint:eslint&quot;: &quot;eslint src/**/*.{ts,vue} --cache --fix&quot;,</span>
<span class="line">    &quot;lint:style&quot;: &quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span>
<span class="line">  },</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们运行<code>pnpm run format</code>的时候，会把代码直接格式化</strong></p><h4 id="四、配置husky" tabindex="-1"><a class="header-anchor" href="#四、配置husky"><span>四、配置husky</span></a></h4><p>在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。</p><p>要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行<code>pnpm run format</code>来自动的格式化我们的代码。</p><p>安装<code>husky</code></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm install -D husky</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>执行</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">npx husky-init</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>会在根目录下生成个一个.husky目录，在这个目录下面会有一个pre-commit文件，这个文件里面的命令在我们执行commit的时候就会执行</p><p>在<code>.husky/pre-commit</code>文件添加如下命令：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">#!/usr/bin/env sh</span>
<span class="line">. &quot;$(dirname -- &quot;$0&quot;)/_/husky.sh&quot;</span>
<span class="line">pnpm run format</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们对代码进行commit操作的时候，就会执行命令，对代码进行格式化，然后再提交。</p><h4 id="五、配置commitlint" tabindex="-1"><a class="header-anchor" href="#五、配置commitlint"><span>五、配置commitlint</span></a></h4><p>对于我们的commit信息，也是有统一规范的，不能随便写,要让每个人都按照统一的标准来执行，我们可以利用<strong>commitlint</strong>来实现。</p><p>安装包</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm add @commitlint/config-conventional @commitlint/cli -D</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>添加配置文件，新建<code>commitlint.config.cjs</code>(注意是cjs)，然后添加下面的代码：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">module.exports = {</span>
<span class="line">  extends: [&#39;@commitlint/config-conventional&#39;],</span>
<span class="line">  // 校验规则</span>
<span class="line">  rules: {</span>
<span class="line">    &#39;type-enum&#39;: [</span>
<span class="line">      2,</span>
<span class="line">      &#39;always&#39;,</span>
<span class="line">      [</span>
<span class="line">        &#39;feat&#39;,</span>
<span class="line">        &#39;fix&#39;,</span>
<span class="line">        &#39;docs&#39;,</span>
<span class="line">        &#39;style&#39;,</span>
<span class="line">        &#39;refactor&#39;,</span>
<span class="line">        &#39;perf&#39;,</span>
<span class="line">        &#39;test&#39;,</span>
<span class="line">        &#39;chore&#39;,</span>
<span class="line">        &#39;revert&#39;,</span>
<span class="line">        &#39;build&#39;,</span>
<span class="line">      ],</span>
<span class="line">    ],</span>
<span class="line">    &#39;type-case&#39;: [0],</span>
<span class="line">    &#39;type-empty&#39;: [0],</span>
<span class="line">    &#39;scope-empty&#39;: [0],</span>
<span class="line">    &#39;scope-case&#39;: [0],</span>
<span class="line">    &#39;subject-full-stop&#39;: [0, &#39;never&#39;],</span>
<span class="line">    &#39;subject-case&#39;: [0, &#39;never&#39;],</span>
<span class="line">    &#39;header-max-length&#39;: [0, &#39;always&#39;, 72],</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>package.json</code>中配置scripts命令</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"># 在scrips中添加下面的代码</span>
<span class="line">{</span>
<span class="line">&quot;scripts&quot;: {</span>
<span class="line">    &quot;commitlint&quot;: &quot;commitlint --config commitlint.config.cjs -e -V&quot;</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置结束，现在当我们填写<code>commit</code>信息的时候，前面就需要带着下面的<code>subject</code></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&#39;feat&#39;,//新特性、新功能</span>
<span class="line">&#39;fix&#39;,//修改bug</span>
<span class="line">&#39;docs&#39;,//文档修改</span>
<span class="line">&#39;style&#39;,//代码格式修改, 注意不是 css 修改</span>
<span class="line">&#39;refactor&#39;,//代码重构</span>
<span class="line">&#39;perf&#39;,//优化相关，比如提升性能、体验</span>
<span class="line">&#39;test&#39;,//测试用例修改</span>
<span class="line">&#39;chore&#39;,//其他修改, 比如改变构建流程、或者增加依赖库、工具等</span>
<span class="line">&#39;revert&#39;,//回滚到上一个版本</span>
<span class="line">&#39;build&#39;,//编译相关的修改，例如发布版本、对项目构建或者依赖的改动</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置husky</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">npx husky add .husky/commit-msg </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在生成的commit-msg文件中添加下面的命令</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">#!/usr/bin/env sh</span>
<span class="line">. &quot;$(dirname -- &quot;$0&quot;)/_/husky.sh&quot;</span>
<span class="line">pnpm commitlint</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们 commit 提交信息时，就不能再随意写了，必须是 git commit -m &#39;fix: xxx&#39; 符合类型的才可以，<strong>需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的</strong></p><h4 id="六、强制使用pnpm包管理器工具" tabindex="-1"><a class="header-anchor" href="#六、强制使用pnpm包管理器工具"><span>六、强制使用pnpm包管理器工具</span></a></h4><p>团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,</p><p>导致项目出现bug问题,因此包管理器工具需要统一管理！！！</p><p>在根目录创建<code>scritps/preinstall.js</code>文件，添加下面的内容</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">if (!/pnpm/.test(process.env.npm_execpath || &#39;&#39;)) {</span>
<span class="line">  console.warn(</span>
<span class="line">    \`\\u001b[33mThis repository must using pnpm as the package manager \` +</span>
<span class="line">    \` for scripts to work properly.\\u001b[39m\\n\`,</span>
<span class="line">  )</span>
<span class="line">  process.exit(1)</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置命令</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&quot;scripts&quot;: {</span>
<span class="line">	&quot;preinstall&quot;: &quot;node ./scripts/preinstall.js&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们使用npm或者yarn来安装包的时候，就会报错了。原理就是在install的时候会触发preinstall（npm提供的生命周期钩子）这个文件里面的代码。</strong></p><h2 id="三、项目集成" tabindex="-1"><a class="header-anchor" href="#三、项目集成"><span>三、项目集成</span></a></h2><h3 id="_3-1集成element-plus" tabindex="-1"><a class="header-anchor" href="#_3-1集成element-plus"><span>3.1集成element-plus</span></a></h3><p>硅谷甄选运营平台,UI组件库采用的element-plus，因此需要集成element-plus插件！！！</p><p>官网地址:https://element-plus.gitee.io/zh-CN/</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm install element-plus @element-plus/icons-vue</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>入口文件main.ts全局安装element-plus,element-plus默认支持语言英语设置为中文</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import ElementPlus from &#39;element-plus&#39;;</span>
<span class="line">import &#39;element-plus/dist/index.css&#39;</span>
<span class="line">//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)</span>
<span class="line">import zhCn from &#39;element-plus/dist/locale/zh-cn.mjs&#39;</span>
<span class="line">app.use(ElementPlus, {</span>
<span class="line">    locale: zhCn</span>
<span class="line">})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Element Plus全局组件类型声明</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// tsconfig.json</span>
<span class="line">{</span>
<span class="line">  &quot;compilerOptions&quot;: {</span>
<span class="line">    // ...</span>
<span class="line">    &quot;types&quot;: [&quot;element-plus/global&quot;]</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完毕可以测试element-plus组件与图标的使用.</p><h3 id="_3-2src别名的配置" tabindex="-1"><a class="header-anchor" href="#_3-2src别名的配置"><span>3.2src别名的配置</span></a></h3><p>在开发项目的时候文件与文件关系可能很复杂，因此我们需要给src文件夹配置一个别名！！！</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// vite.config.ts</span>
<span class="line">import {defineConfig} from &#39;vite&#39;</span>
<span class="line">import vue from &#39;@vitejs/plugin-vue&#39;</span>
<span class="line">import path from &#39;path&#39;</span>
<span class="line">export default defineConfig({</span>
<span class="line">    plugins: [vue()],</span>
<span class="line">    resolve: {</span>
<span class="line">        alias: {</span>
<span class="line">            &quot;@&quot;: path.resolve(&quot;./src&quot;) // 相对路径别名配置，使用 @ 代替 src</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>TypeScript 编译配置</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">// tsconfig.json</span>
<span class="line">{</span>
<span class="line">  &quot;compilerOptions&quot;: {</span>
<span class="line">    &quot;baseUrl&quot;: &quot;./&quot;, // 解析非相对模块的基地址，默认是当前目录</span>
<span class="line">    &quot;paths&quot;: { //路径映射，相对于baseUrl</span>
<span class="line">      &quot;@/*&quot;: [&quot;src/*&quot;] </span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3环境变量的配置" tabindex="-1"><a class="header-anchor" href="#_3-3环境变量的配置"><span>3.3环境变量的配置</span></a></h3><p><strong>项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。</strong></p><p>开发环境（development） 顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。</p><p>测试环境（testing） 测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试</p><p>生产环境（production） 生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)</p><p>注意:一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！</p><p>项目根目录分别添加 开发、生产和测试环境的文件!</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">.env.development</span>
<span class="line">.env.production</span>
<span class="line">.env.test</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件内容</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"># 变量必须以 VITE_ 为前缀才能暴露给外部读取</span>
<span class="line">NODE_ENV = &#39;development&#39;</span>
<span class="line">VITE_APP_TITLE = &#39;硅谷甄选运营平台&#39;</span>
<span class="line">VITE_APP_BASE_API = &#39;/dev-api&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">NODE_ENV = &#39;production&#39;</span>
<span class="line">VITE_APP_TITLE = &#39;硅谷甄选运营平台&#39;</span>
<span class="line">VITE_APP_BASE_API = &#39;/prod-api&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"># 变量必须以 VITE_ 为前缀才能暴露给外部读取</span>
<span class="line">NODE_ENV = &#39;test&#39;</span>
<span class="line">VITE_APP_TITLE = &#39;硅谷甄选运营平台&#39;</span>
<span class="line">VITE_APP_BASE_API = &#39;/test-api&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置运行命令：package.json</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line"> &quot;scripts&quot;: {</span>
<span class="line">    &quot;dev&quot;: &quot;vite --open&quot;,</span>
<span class="line">    &quot;build:test&quot;: &quot;vue-tsc &amp;&amp; vite build --mode test&quot;,</span>
<span class="line">    &quot;build:pro&quot;: &quot;vue-tsc &amp;&amp; vite build --mode production&quot;,</span>
<span class="line">    &quot;preview&quot;: &quot;vite preview&quot;</span>
<span class="line">  },</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过import.meta.env获取环境变量</p><h3 id="_3-4svg图标配置" tabindex="-1"><a class="header-anchor" href="#_3-4svg图标配置"><span>3.4SVG图标配置</span></a></h3><p>在开发项目的时候经常会用到svg矢量图,而且我们使用SVG以后，页面上加载的不再是图片资源,</p><p>这对页面性能来说是个很大的提升，而且我们SVG文件比img要小的很多，放在项目中几乎不占用资源。</p><p><strong>安装SVG依赖插件</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm install vite-plugin-svg-icons -D</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>在<code>vite.config.ts</code>中配置插件</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import { createSvgIconsPlugin } from &#39;vite-plugin-svg-icons&#39;</span>
<span class="line">import path from &#39;path&#39;</span>
<span class="line">export default () =&gt; {</span>
<span class="line">  return {</span>
<span class="line">    plugins: [</span>
<span class="line">      createSvgIconsPlugin({</span>
<span class="line">        // Specify the icon folder to be cached</span>
<span class="line">        iconDirs: [path.resolve(process.cwd(), &#39;src/assets/icons&#39;)],</span>
<span class="line">        // Specify symbolId format</span>
<span class="line">        symbolId: &#39;icon-[dir]-[name]&#39;,</span>
<span class="line">      }),</span>
<span class="line">    ],</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>入口文件导入</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import &#39;virtual:svg-icons-register&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="_3-4-1svg封装为全局组件" tabindex="-1"><a class="header-anchor" href="#_3-4-1svg封装为全局组件"><span>3.4.1svg封装为全局组件</span></a></h4><p>因为项目很多模块需要使用图标,因此把它封装为全局组件！！！</p><p><strong>在src/components目录下创建一个SvgIcon组件:代表如下</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;svg :style=&quot;{ width: width, height: height }&quot;&gt;</span>
<span class="line">      &lt;use :xlink:href=&quot;prefix + name&quot; :fill=&quot;color&quot;&gt;&lt;/use&gt;</span>
<span class="line">    &lt;/svg&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line"></span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">defineProps({</span>
<span class="line">  //xlink:href属性值的前缀</span>
<span class="line">  prefix: {</span>
<span class="line">    type: String,</span>
<span class="line">    default: &#39;#icon-&#39;</span>
<span class="line">  },</span>
<span class="line">  //svg矢量图的名字</span>
<span class="line">  name: String,</span>
<span class="line">  //svg图标的颜色</span>
<span class="line">  color: {</span>
<span class="line">    type: String,</span>
<span class="line">    default: &quot;&quot;</span>
<span class="line">  },</span>
<span class="line">  //svg宽度</span>
<span class="line">  width: {</span>
<span class="line">    type: String,</span>
<span class="line">    default: &#39;16px&#39;</span>
<span class="line">  },</span>
<span class="line">  //svg高度</span>
<span class="line">  height: {</span>
<span class="line">    type: String,</span>
<span class="line">    default: &#39;16px&#39;</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">})</span>
<span class="line">&lt;/script&gt;</span>
<span class="line">&lt;style scoped&gt;&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在src文件夹目录下创建一个index.ts文件：用于注册components文件夹内部全部全局组件！！！</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import SvgIcon from &#39;./SvgIcon/index.vue&#39;;</span>
<span class="line">import type { App, Component } from &#39;vue&#39;;</span>
<span class="line">const components: { [name: string]: Component } = { SvgIcon };</span>
<span class="line">export default {</span>
<span class="line">    install(app: App) {</span>
<span class="line">        Object.keys(components).forEach((key: string) =&gt; {</span>
<span class="line">            app.component(key, components[key]);</span>
<span class="line">        })</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在入口文件引入src/index.ts文件,通过app.use方法安装自定义插件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import gloablComponent from &#39;./components/index&#39;;</span>
<span class="line">app.use(gloablComponent);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5集成sass" tabindex="-1"><a class="header-anchor" href="#_3-5集成sass"><span>3.5集成sass</span></a></h3><p>我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang=&quot;scss&quot;</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">&lt;style scoped lang=&quot;scss&quot;&gt;&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>接下来我们为项目添加一些全局的样式</p><p>在src/styles目录下创建一个index.scss文件，当然项目中需要用到清除默认样式，因此在index.scss引入reset.scss</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">@import reset.scss</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在入口文件引入</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import &#39;@/styles&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>但是你会发现在src/styles/index.scss全局样式文件中没有办法使用$变量.因此需要给项目中引入全局变量$.</p><p>在style/variable.scss创建一个variable.scss文件！</p><p>在vite.config.ts文件配置如下:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">export default defineConfig((config) =&gt; {</span>
<span class="line">	css: {</span>
<span class="line">      preprocessorOptions: {</span>
<span class="line">        scss: {</span>
<span class="line">          javascriptEnabled: true,</span>
<span class="line">          additionalData: &#39;@import &quot;./src/styles/variable.scss&quot;;&#39;,</span>
<span class="line">        },</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>@import &quot;./src/styles/variable.less&quot;;</code>后面的<code>;</code>不要忘记，不然会报错</strong>!</p><p>配置完毕你会发现scss提供这些全局变量可以在组件样式中使用了！！！</p><h3 id="_3-6mock数据" tabindex="-1"><a class="header-anchor" href="#_3-6mock数据"><span>3.6mock数据</span></a></h3><p>安装依赖:https://www.npmjs.com/package/vite-plugin-mock</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm install -D vite-plugin-mock mockjs</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在 vite.config.ts 配置文件启用插件。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import { defineConfig } from &#39;vite&#39;</span>
<span class="line">import vue from &#39;@vitejs/plugin-vue&#39;</span>
<span class="line">import { viteMockServe } from &#39;vite-plugin-mock&#39;</span>
<span class="line"></span>
<span class="line">export default defineConfig(({ command }) =&gt; {</span>
<span class="line">  return {</span>
<span class="line">    plugins: [</span>
<span class="line">      vue(),</span>
<span class="line">      viteMockServe({</span>
<span class="line">        mockPath: &#39;mock&#39;, // mock 文件目录</span>
<span class="line">        enable: command === &#39;serve&#39;, // 仅在开发环境启用</span>
<span class="line">        watchFiles: true, // 支持 mock 文件热更新</span>
<span class="line">      }),</span>
<span class="line">    ],</span>
<span class="line">  }</span>
<span class="line">})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！</p><p>在mock文件夹内部创建一个user.ts文件</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import type { MockMethod } from &quot;vite-plugin-mock&quot;;</span>
<span class="line"></span>
<span class="line">// 用户相关的 mock 接口定义</span>
<span class="line">const userMocks: MockMethod[] = [</span>
<span class="line">  {</span>
<span class="line">    // 获取用户列表接口</span>
<span class="line">    url: &quot;/api/user/list&quot;,</span>
<span class="line">    method: &quot;get&quot;,</span>
<span class="line">    response: () =&gt; {</span>
<span class="line">      return {</span>
<span class="line">        code: 200,</span>
<span class="line">        message: &quot;success&quot;,</span>
<span class="line">        data: [</span>
<span class="line">          { id: 1, name: &quot;张三&quot;, age: 28 },</span>
<span class="line">          { id: 2, name: &quot;李四&quot;, age: 32 },</span>
<span class="line">          { id: 3, name: &quot;王五&quot;, age: 24 },</span>
<span class="line">        ],</span>
<span class="line">      };</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">    // 获取单个用户详情接口</span>
<span class="line">    url: &quot;/api/user/detail&quot;,</span>
<span class="line">    method: &quot;post&quot;,</span>
<span class="line">    // 从 body 获取 id 参数</span>
<span class="line">    response: ({ body }: { body: { id?: string } }) =&gt; {</span>
<span class="line">      const users = [</span>
<span class="line">        { id: 1, name: &quot;张三&quot;, age: 28 },</span>
<span class="line">        { id: 2, name: &quot;李四&quot;, age: 32 },</span>
<span class="line">        { id: 3, name: &quot;王五&quot;, age: 24 },</span>
<span class="line">      ];</span>
<span class="line">      // 根据 id 查找用户</span>
<span class="line">      const user = users.find((u) =&gt; u.id === Number(body.id));</span>
<span class="line">      return {</span>
<span class="line">        code: user ? 200 : 404,</span>
<span class="line">        message: user ? &quot;success&quot; : &quot;用户不存在&quot;,</span>
<span class="line">        data: user || null,</span>
<span class="line">      };</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">];</span>
<span class="line"></span>
<span class="line">// 导出 mock 配置</span>
<span class="line">export default userMocks; </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装axios</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pnpm install axios</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>最后通过axios测试接口！！！</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>ts<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 获取用户列表并输出到控制台</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">fetchUserList</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/api/user/detail&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">fetchUserList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-7axios二次封装" tabindex="-1"><a class="header-anchor" href="#_3-7axios二次封装"><span>3.7axios二次封装</span></a></h3><p>在开发项目的时候避免不了与后端进行交互,因此我们需要使用axios插件实现发送网络请求。在开发项目的时候</p><p>我们经常会把axios进行二次封装。</p><p>目的:</p><p>1:使用请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)</p><p>2:使用响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)</p><p>在根目录下创建utils/request.ts</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">import axios from &quot;axios&quot;;</span>
<span class="line">import { ElMessage } from &quot;element-plus&quot;;</span>
<span class="line">//创建axios实例</span>
<span class="line">let request = axios.create({</span>
<span class="line">    baseURL: import.meta.env.VITE_APP_BASE_API,</span>
<span class="line">    timeout: 5000</span>
<span class="line">})</span>
<span class="line">//请求拦截器</span>
<span class="line">request.interceptors.request.use(config =&gt; {</span>
<span class="line">    return config;</span>
<span class="line">});</span>
<span class="line">//响应拦截器</span>
<span class="line">request.interceptors.response.use((response) =&gt; {</span>
<span class="line">    return response.data;</span>
<span class="line">}, (error) =&gt; {</span>
<span class="line">    //处理网络错误</span>
<span class="line">    let msg = &#39;&#39;;</span>
<span class="line">    let status = error.response.status;</span>
<span class="line">    switch (status) {</span>
<span class="line">        case 401:</span>
<span class="line">            msg = &quot;token过期&quot;;</span>
<span class="line">            break;</span>
<span class="line">        case 403:</span>
<span class="line">            msg = &#39;无权访问&#39;;</span>
<span class="line">            break;</span>
<span class="line">        case 404:</span>
<span class="line">            msg = &quot;请求地址错误&quot;;</span>
<span class="line">            break;</span>
<span class="line">        case 500:</span>
<span class="line">            msg = &quot;服务器出现问题&quot;;</span>
<span class="line">            break;</span>
<span class="line">        default:</span>
<span class="line">            msg = &quot;无网络&quot;;</span>
<span class="line"></span>
<span class="line">    }</span>
<span class="line">    ElMessage({</span>
<span class="line">        type: &#39;error&#39;,</span>
<span class="line">        message: msg</span>
<span class="line">    })</span>
<span class="line">    return Promise.reject(error);</span>
<span class="line">});</span>
<span class="line">export default request;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8api接口统一管理" tabindex="-1"><a class="header-anchor" href="#_3-8api接口统一管理"><span>3.8API接口统一管理</span></a></h3><p>在开发项目的时候,接口可能很多需要统一管理。在src目录下去创建api文件夹去统一管理项目的接口；</p><p>比如:下面方式</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">//统一管理咱们项目用户相关的接口</span>
<span class="line"></span>
<span class="line">import request from &#39;@/utils/request&#39;</span>
<span class="line"></span>
<span class="line">import type {</span>
<span class="line"></span>
<span class="line"> loginFormData,</span>
<span class="line"></span>
<span class="line"> loginResponseData,</span>
<span class="line"></span>
<span class="line"> userInfoReponseData,</span>
<span class="line"></span>
<span class="line">} from &#39;./type&#39;</span>
<span class="line"></span>
<span class="line">//项目用户相关的请求地址</span>
<span class="line"></span>
<span class="line">enum API {</span>
<span class="line"></span>
<span class="line"> LOGIN_URL = &#39;/admin/acl/index/login&#39;,</span>
<span class="line"></span>
<span class="line"> USERINFO_URL = &#39;/admin/acl/index/info&#39;,</span>
<span class="line"></span>
<span class="line"> LOGOUT_URL = &#39;/admin/acl/index/logout&#39;,</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line">//登录接口</span>
<span class="line">export const reqLogin = (data: loginFormData) =&gt;</span>
<span class="line"> request.post&lt;any, loginResponseData&gt;(API.LOGIN_URL, data)</span>
<span class="line">//获取用户信息</span>
<span class="line"></span>
<span class="line">export const reqUserInfo = () =&gt;</span>
<span class="line"></span>
<span class="line"> request.get&lt;any, userInfoReponseData&gt;(API.USERINFO_URL)</span>
<span class="line"></span>
<span class="line">//退出登录</span>
<span class="line"></span>
<span class="line">export const reqLogout = () =&gt; request.post&lt;any, any&gt;(API.LOGOUT_URL)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、项目的资源地址" tabindex="-1"><a class="header-anchor" href="#四、项目的资源地址"><span>四、项目的资源地址</span></a></h2><p>贾成豪老师代码仓库地址:https://gitee.com/jch1011/vue3_admin_template-bj1.git</p><p>项目在线文档:</p><p>服务器域名:http://sph-api.atguigu.cn</p><p>swagger文档:</p><p>http://139.198.104.58:8209/swagger-ui.html</p><p>http://139.198.104.58:8212/swagger-ui.html#/</p><p>echarts:国内镜像网站</p><p>https://www.isqqw.com/echarts-doc/zh/option.html#title</p><p>http://datav.aliyun.com/portal/school/atlas/area_selector</p>`,298)])])}const c=n(l,[["render",t]]),r=JSON.parse('{"path":"/posts/modelcode/%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E9%A1%B9%E7%9B%AE%E7%AC%94%E8%AE%B0.html","title":"硅谷甄选运营平台","lang":"zh-CN","frontmatter":{"date":"2025-09-22T00:00:00.000Z","category":["项目笔记"],"tag":["Vue3","ElementPlus","TypeScript"]},"headers":[{"level":2,"title":"一、vue3组件通信方式","slug":"一、vue3组件通信方式","link":"#一、vue3组件通信方式","children":[{"level":3,"title":"1.1props","slug":"_1-1props","link":"#_1-1props","children":[]},{"level":3,"title":"1.2自定义事件","slug":"_1-2自定义事件","link":"#_1-2自定义事件","children":[]},{"level":3,"title":"1.3全局事件总线","slug":"_1-3全局事件总线","link":"#_1-3全局事件总线","children":[]},{"level":3,"title":"1.4v-model","slug":"_1-4v-model","link":"#_1-4v-model","children":[]},{"level":3,"title":"1.5useAttrs","slug":"_1-5useattrs","link":"#_1-5useattrs","children":[]},{"level":3,"title":"1.6ref与$parent","slug":"_1-6ref与-parent","link":"#_1-6ref与-parent","children":[]},{"level":3,"title":"1.7provide与inject","slug":"_1-7provide与inject","link":"#_1-7provide与inject","children":[]},{"level":3,"title":"1.8pinia","slug":"_1-8pinia","link":"#_1-8pinia","children":[]},{"level":3,"title":"1.9slot","slug":"_1-9slot","link":"#_1-9slot","children":[]}]},{"level":2,"title":"二、搭建后台管理系统模板","slug":"二、搭建后台管理系统模板","link":"#二、搭建后台管理系统模板","children":[{"level":3,"title":"2.1项目初始化","slug":"_2-1项目初始化","link":"#_2-1项目初始化","children":[]},{"level":3,"title":"2.2项目配置","slug":"_2-2项目配置","link":"#_2-2项目配置","children":[]}]},{"level":2,"title":"三、项目集成","slug":"三、项目集成","link":"#三、项目集成","children":[{"level":3,"title":"3.1集成element-plus","slug":"_3-1集成element-plus","link":"#_3-1集成element-plus","children":[]},{"level":3,"title":"3.2src别名的配置","slug":"_3-2src别名的配置","link":"#_3-2src别名的配置","children":[]},{"level":3,"title":"3.3环境变量的配置","slug":"_3-3环境变量的配置","link":"#_3-3环境变量的配置","children":[]},{"level":3,"title":"3.4SVG图标配置","slug":"_3-4svg图标配置","link":"#_3-4svg图标配置","children":[]},{"level":3,"title":"3.5集成sass","slug":"_3-5集成sass","link":"#_3-5集成sass","children":[]},{"level":3,"title":"3.6mock数据","slug":"_3-6mock数据","link":"#_3-6mock数据","children":[]},{"level":3,"title":"3.7axios二次封装","slug":"_3-7axios二次封装","link":"#_3-7axios二次封装","children":[]},{"level":3,"title":"3.8API接口统一管理","slug":"_3-8api接口统一管理","link":"#_3-8api接口统一管理","children":[]}]},{"level":2,"title":"四、项目的资源地址","slug":"四、项目的资源地址","link":"#四、项目的资源地址","children":[]}],"git":{"updatedTime":1765244359000,"contributors":[{"name":"ksldnasx","username":"ksldnasx","email":"wh8261408@126.com","commits":2,"url":"https://github.com/ksldnasx"}],"changelog":[{"hash":"a0089923dda5b0a1e568fce8d29533128e78ce23","time":1765244359000,"email":"wh8261408@126.com","author":"ksldnasx","message":"fix:各类文件布局"},{"hash":"777080f9cb61625063573bffd7eb8f506620dc39","time":1762400469000,"email":"wh8261408@126.com","author":"ksldnasx","message":"init"}]},"filePathRelative":"posts/modelcode/硅谷甄选项目笔记.md","excerpt":"\\n<p>此次教学课程为硅谷甄选运营平台项目,包含运营平台项目模板从0到1开发，以及数据大屏幕、权限等业务。</p>\\n<p>此次教学课程涉及到技术栈包含 <strong>:vue3+TypeScript+vue-router+pinia+element-plus+axios+echarts</strong> 等技术栈。</p>\\n<h2>一、vue3组件通信方式</h2>\\n<p><strong>通信仓库地址:https://gitee.com/jch1011/vue3_communication.git</strong></p>\\n<p>不管是vue2还是vue3,组件通信方式很重要,不管是项目还是面试都是经常用到的知识点。</p>"}');export{c as comp,r as data};
