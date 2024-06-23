```vue
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-column">
        <h3>Đặc điểm</h3>
        <ul>
          <li>All Features</li>
          <li>Modules</li>
          <li>Layouts</li>
          <li>No-Code Builder</li>
          <li>Workflow</li>
          <li>Ecommerce Websites</li>
          <li>Theme Builder</li>
          <li>Marketing Platform</li>
          <li>Speed & Performance</li>
          <li>Developers</li>
          <li>Premium Support</li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Sản phẩm</h3>
        <ul>
          <li>Theme</li>
          <li>Marketplace</li>
          <li>Cloud</li>
          <li>AI</li>
          <li>Teams</li>
          <li>VIP</li>
          <li>Hosting</li>
          <li>Extra Theme</li>
          <li>Bloom Plugin</li>
          <li>Monarch Plugin</li>
          <li>Plans & Pricing</li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Tài nguyên</h3>
        <ul>
          <li>Documentation</li>
          <li>Help Articles & FAQ</li>
          <li>24/7 Support</li>
          <li>Developer Docs</li>
          <li>System Status</li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Blog</h3>
        <ul>
          <li>Recent Posts</li>
          <li>Product Updates</li>
          <li>Resources</li>
          <li>Business</li>
          <li>WordPress</li>
          <li>Best Plugins</li>
          <li>Top Tools</li>
          <li>Best Hosting</li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Community</h3>
        <ul>
          <li>Meetups</li>
          <li>Facebook Group</li>
          <li>Examples</li>
          <li>Integrations</li>
          <li>Reviews</li>
          <li>Community Forum</li>
          <li>Affiliate Program</li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Công ty</h3>
        <ul>
          <li>Giới thiệu</li>
          <li>Sự nghiệp</li>
          <li>Liên hệ</li>
          <li>Điều khoản dịch vụ</li>
          <li>Chính sách bảo mật</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 ESmart Solutions Agency. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style scoped>
.footer {
  background-color: white;
  padding: 2rem 1rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2rem 0;
}

.footer-column {
  flex: 1;
  margin: 0 1rem;
  min-width: 200px;
}

.footer-column h3 {
  color: #333;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  color: #666;
  margin-bottom: 0.5rem;
}

.footer-bottom {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
  color: #666;
}
</style>
```