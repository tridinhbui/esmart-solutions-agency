<template>
  <footer class="bg-black text-white py-10">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Left Section -->
      <div>
        <h2 class="text-2xl font-bold mb-4">AR Agency Revolution</h2>
        <p class="mb-2">
          <span class="font-semibold">📞 Phone</span><br />
          Call: 800-606-0477
        </p>
        <p class="mb-2">
          <span class="font-semibold">📧 Email</span><br />
          Support: team@agencyrevolution.com<br />
          Sales: grow@agencyrevolution.com
        </p>
        <div class="flex gap-4 mt-4">
          <button class="px-4 py-2 border border-white rounded font-semibold">
            Support
          </button>
          <button class="px-4 py-2 bg-yellow-500 text-black font-bold rounded">
            30-Min Consult
          </button>
        </div>
      </div>

      <!-- Insurance Marketing -->
      <div>
        <h3 class="font-bold mb-3">Insurance Marketing</h3>
        <ul class="space-y-2">
          <li>Insurance Websites</li>
          <li>Marketing Automation</li>
          <li>Marketing + Websites</li>
          <li>Enterprise</li>
        </ul>
        <h3 class="font-bold mt-6 mb-3">Digital Features</h3>
        <ul class="space-y-2">
          <li>Business Texting</li>
          <li>Do It For Me Marketing</li>
          <li>Local Listings</li>
          <li>Reputation Management</li>
          <li>Social Media</li>
        </ul>
      </div>

      <!-- Resources & Support -->
      <div>
        <h3 class="font-bold mb-3">Resources</h3>
        <ul class="space-y-2">
          <li>Insurance Blog</li>
          <li>Insurance Resources</li>
          <li>Insurance Webinars</li>
        </ul>
        <h3 class="font-bold mt-6 mb-3">Support</h3>
        <ul class="space-y-2">
          <li>Get Support</li>
          <li>Live Training</li>
          <li>Help Center</li>
        </ul>
      </div>

      <!-- Who We Are & Serve -->
      <div>
        <h3 class="font-bold mb-3">Who We Are</h3>
        <ul class="space-y-2">
          <li>About Us</li>
          <li>Leadership</li>
          <li>Careers</li>
        </ul>
        <h3 class="font-bold mt-6 mb-3">Who We Serve</h3>
        <ul class="space-y-2">
          <li>Insurance Professionals</li>
          <li>Enterprises</li>
        </ul>
      </div>
    </div>

    <!-- Bottom Text -->
    <div class="max-w-7xl mx-auto px-6 mt-10 text-sm text-gray-400">
      <p>
        Agency Revolution provides insurance marketing automation and digital
        marketing tools to independent insurance agents and brokers throughout
        the nation including Oregon, California, New York, Texas, Florida,
        Pennsylvania, Illinois, Ohio, Georgia, North Carolina, Michigan, New
        Jersey, Virginia, Washington, Arizona and others in the United States.
        Do not sell my personal information.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "SimpleFooter",
};
</script>

<style scoped>
footer ul li {
  cursor: pointer;
}
</style>
