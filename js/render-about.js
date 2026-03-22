import { t } from './i18n.js';

export function renderAbout(lang) {
  const el = document.getElementById('page-about');
  if (!el) return;

  const content = lang === 'en' ? getEnContent() : getZhContent();
  const breadHome = t('breadcrumb-home');
  const breadAbout = t('nav-about');

  el.innerHTML = `
    <section class="profile-hero">
      <div class="hero-watermark">
        <div class="hero-watermark-inner">
          <div class="watermark-text-top">VIBE CODING MEMORIAL</div>
          <div class="wm-roof"></div>
          <div class="watermark-columns">
            <div class="wm-col"></div><div class="wm-col"></div><div class="wm-col"></div><div class="wm-col"></div><div class="wm-col"></div>
          </div>
          <div class="wm-base"></div>
          <div class="watermark-text-bottom">Commission</div>
        </div>
      </div>
      <div class="profile-hero-inner">
        <div class="hero-breadcrumb-row">
          <a href="#/">${breadHome}</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${breadAbout}</span>
        </div>
        <div class="hero-top-row">
          <span class="hero-category">${lang === 'en' ? 'ABOUT THE COMMISSION' : '关于本馆'}</span>
        </div>
        <h1 class="hero-name">${lang === 'en' ? 'About' : '关于本馆'}</h1>
      </div>
    </section>
    <div class="profile-content">
      <div class="narrative">
        ${content}
      </div>
    </div>
  `;
}

function getZhContent() {
  return `
    <h2>使命宣言</h2>
    <div class="quote-block">
      <p>"本委员会致力于记录、保存并纪念每一个在 vibe coding 浪潮中英勇倒下的项目。我们相信，每一个 <code>npm init</code> 都值得被铭记，每一次 <code>git push --force</code> 都不应被遗忘。"</p>
    </div>
    <p>Vibe Coding 阵亡将士纪念委员会（以下简称"本委员会"）是全球首个也是唯一一个致力于 vibe coding 项目善后工作的非营利性虚构机构。我们不生产代码，我们只是代码坟场的搬运工。</p>

    <h2>委员会简史</h2>
    <p>2026 年 1 月的一个深夜，一位开发者在关闭了自己第三个月内第三个 AI 项目后，陷入了深深的沉思。看着 GitHub 上那些绿油油的 contribution graph 和空荡荡的用户数据，他意识到：这些项目不应该就这样消失在 <code>git archive</code> 的深处。</p>
    <p>它们曾经也有过梦想——被 Product Hunt 推荐、被 Y Combinator 投资、被用户自发传播。虽然这些梦想无一实现，但每一行被写出又被删除的代码，每一个被注册又被遗弃的域名，都值得被记住。</p>
    <p>于是，Vibe Coding 阵亡将士纪念委员会应运而生。</p>

    <h2>组织架构</h2>
    <table class="info-table">
      <tr>
        <td>主席兼首席悼念官</td>
        <td>负责在每个项目的葬礼上发表感人致辞，目前已致辞 10 次，哭了 0 次</td>
      </tr>
      <tr>
        <td>首席验尸官</td>
        <td>负责鉴定项目死因，最常用的诊断书模板是"护城河为零"</td>
      </tr>
      <tr>
        <td>墓碑首席设计师</td>
        <td>负责为每个项目设计独一无二的墓碑，使用的工具当然是 AI</td>
      </tr>
      <tr>
        <td>Token 消耗审计员</td>
        <td>负责统计每个项目生前消耗的 API 费用，经常被数字吓到</td>
      </tr>
      <tr>
        <td>临终关怀顾问</td>
        <td>为即将阵亡的项目提供心理辅导，常用话术："至少你学到了东西"</td>
      </tr>
    </table>

    <h2>常见问题</h2>
    <div class="faq-item">
      <h3>我的项目还活着但快不行了怎么办？</h3>
      <p>建议尽早申请安葬，我们提供临终关怀服务。与其让项目在 ICU（Infinite Cloud Usage）中苟延残喘，不如体面地告别。</p>
    </div>
    <div class="faq-item">
      <h3>安葬需要付费吗？</h3>
      <p>完全免费。你已经在 API 调用上花够多了。</p>
    </div>
    <div class="faq-item">
      <h3>可以申请复活吗？</h3>
      <p>本委员会不提供还魂服务。历史经验表明，复活的项目通常会以更快的速度再次阵亡。建议直接开一个新项目（然后再来找我们）。</p>
    </div>
    <div class="faq-item">
      <h3>我的项目死因写得太难听了，能改吗？</h3>
      <p>真相可能令人不适，但本委员会秉持"实事求是"的验尸原则。不过，您可以在遗言栏为自己辩护。</p>
    </div>
    <div class="faq-item">
      <h3>如何避免项目阵亡？</h3>
      <p>本委员会的职责是安葬而非预防。但根据多年验尸经验，我们发现一个规律：在写第一行代码之前先确认有人需要你的产品，存活率会显著提高。</p>
    </div>
  `;
}

function getEnContent() {
  return `
    <h2>Mission Statement</h2>
    <div class="quote-block">
      <p>"The Commission is dedicated to documenting, preserving, and commemorating every project that has fallen bravely in the vibe coding revolution. We believe every <code>npm init</code> deserves to be remembered, and every <code>git push --force</code> should never be forgotten."</p>
    </div>
    <p>The Vibe Coding Memorial Commission (hereinafter "the Commission") is the world's first and only non-profit fictional institution dedicated to the aftercare of vibe coding projects. We don't produce code; we're merely the undertakers of the code graveyard.</p>

    <h2>Brief History</h2>
    <p>Late one night in January 2026, a developer sat in silence after shutting down his third AI project in three months. Staring at the lush green contribution graph on GitHub and the barren user analytics dashboard, he realized: these projects shouldn't just vanish into the depths of <code>git archive</code>.</p>
    <p>They once had dreams too. Dreams of being featured on Product Hunt, funded by Y Combinator, and organically shared by users. Though none of these dreams came true, every line of code written and deleted, every domain registered and abandoned, deserves to be remembered.</p>
    <p>And so, the Vibe Coding Memorial Commission was born.</p>

    <h2>Organizational Structure</h2>
    <table class="info-table">
      <tr>
        <td>Chairman & Chief Mourning Officer</td>
        <td>Delivers heartfelt eulogies at every project funeral. 10 speeches given, 0 tears shed.</td>
      </tr>
      <tr>
        <td>Chief Coroner</td>
        <td>Determines cause of death. Most frequently used template: "Zero moat."</td>
      </tr>
      <tr>
        <td>Chief Tombstone Designer</td>
        <td>Designs unique headstones for each project. Using AI, of course.</td>
      </tr>
      <tr>
        <td>Token Consumption Auditor</td>
        <td>Tracks API spending of each deceased project. Frequently horrified by the numbers.</td>
      </tr>
      <tr>
        <td>End-of-Life Counselor</td>
        <td>Provides emotional support for dying projects. Go-to phrase: "At least you learned something."</td>
      </tr>
    </table>

    <h2>Frequently Asked Questions</h2>
    <div class="faq-item">
      <h3>My project is still alive but barely breathing. What do I do?</h3>
      <p>We recommend applying for burial early. We offer end-of-life care. Rather than letting your project languish in the ICU (Infinite Cloud Usage), give it a dignified farewell.</p>
    </div>
    <div class="faq-item">
      <h3>Is burial free?</h3>
      <p>Completely free. You've already spent enough on API calls.</p>
    </div>
    <div class="faq-item">
      <h3>Can I apply for resurrection?</h3>
      <p>The Commission does not offer resurrection services. Historical evidence shows that resurrected projects typically die again even faster. We recommend starting a new project instead (and then coming back to us).</p>
    </div>
    <div class="faq-item">
      <h3>The cause of death sounds too harsh. Can I change it?</h3>
      <p>The truth may be uncomfortable, but the Commission upholds the principle of "truthful autopsy." However, you may defend yourself in the Last Words section.</p>
    </div>
    <div class="faq-item">
      <h3>How do I prevent my project from dying?</h3>
      <p>The Commission's duty is burial, not prevention. However, based on years of autopsy experience, we've observed a pattern: confirming that someone actually needs your product before writing the first line of code significantly improves survival rates.</p>
    </div>
  `;
}
