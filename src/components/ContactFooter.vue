<template>
  <footer class="relative mt-8 text-gray-800">
    <!-- bg + soft glows -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    ></div>
    <div
      class="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl"
    ></div>

    <div class="relative px-4 py-8">
      <div
        class="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-md super-rounded"
      >
        <!-- header -->
        <div class="flex flex-col items-center gap-2 px-6 pt-6 text-center">
          <span class="text-[10px] tracking-[0.2em] text-blue-500/80"
            >ESMART SOLUTIONS</span
          >
          <h2 class="text-xl font-semibold tracking-tight text-slate-800">
            Let’s connect
          </h2>
          <p class="text-sm text-slate-500">Reach us via any channel below.</p>
        </div>

        <!-- items: row on md+ -->
        <ul class="px-4 py-5">
          <li class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <!-- Address -->
            <a
              href="https://maps.google.com/?q=140 Nguyen Xien st, Thanh Xuan dist"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 rounded-2xl item-super-rounded border border-slate-100 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              <span
                class="relative inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-100 text-blue-700"
              >
                <span
                  class="absolute inset-0 rounded-full bg-blue-400/30 opacity-0 blur transition group-hover:opacity-100"
                ></span>
                <img
                  src="@/assets/pin.png"
                  alt="Location"
                  class="contact-icon"
                />
              </span>
              <span class="min-w-0">
                <span
                  class="block truncate font-medium text-slate-700 underline-offset-4 group-hover:underline group-hover:text-blue-600"
                >
                  140 Nguyen Xien st, Thanh Xuan dist
                </span>
                <span class="mt-0.5 block text-xs text-blue-700/70"
                  >Open in Maps</span
                >
              </span>
            </a>

            <!-- Phone -->
            <a
              href="tel:+84868885505"
              class="group flex items-center gap-3 rounded-2xl item-super-rounded border border-slate-100 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              <span
                class="relative inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
              >
                <span
                  class="absolute inset-0 rounded-full bg-emerald-400/30 opacity-0 blur transition group-hover:opacity-100"
                ></span>
                <img
                  src="@/assets/phone-call.png"
                  alt="Phone"
                  class="contact-icon"
                />
              </span>
              <span class="min-w-0">
                <span
                  class="block truncate font-medium text-slate-700 underline-offset-4 group-hover:underline group-hover:text-emerald-600"
                >
                  +84 868 885 505
                </span>
                <span class="mt-0.5 block text-xs text-emerald-700/70"
                  >Tap to call</span
                >
              </span>
            </a>

            <!-- Email -->
            <a
              href="mailto:esmartsolutions.agency@gmail.com"
              class="group flex items-center gap-3 rounded-2xl item-super-rounded border border-slate-100 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              <span
                class="relative inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-violet-100 text-violet-700"
              >
                <span
                  class="absolute inset-0 rounded-full bg-violet-400/30 opacity-0 blur transition group-hover:opacity-100"
                ></span>
                <img
                  src="@/assets/email.png"
                  alt="Email"
                  class="contact-icon"
                />
              </span>
              <span class="min-w-0">
                <span
                  class="block truncate font-medium text-slate-700 underline-offset-4 group-hover:underline group-hover:text-violet-600"
                >
                  esmartsolutions.agency@gmail.com
                </span>
                <span class="mt-0.5 block text-xs text-violet-700/70"
                  >Send an email</span
                >
              </span>
            </a>

            <!-- Website -->
            <a
              href="https://esmartsolutions.com.vn"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 rounded-2xl item-super-rounded border border-slate-100 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              <span
                class="relative inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-amber-100 text-amber-700"
              >
                <span
                  class="absolute inset-0 rounded-full bg-amber-400/30 opacity-0 blur transition group-hover:opacity-100"
                ></span>
                <img
                  src="@/assets/www.png"
                  alt="Website"
                  class="contact-icon"
                />
              </span>
              <span class="min-w-0">
                <span
                  class="block truncate font-medium text-slate-700 underline-offset-4 group-hover:underline group-hover:text-amber-700"
                >
                  Esmartsolutions.com.vn
                </span>
                <span class="mt-0.5 block text-xs text-amber-700/70"
                  >Visit site</span
                >
              </span>
            </a>
          </li>
        </ul>

        <!-- copyright -->
        <div
          class="flex items-center justify-between border-t border-slate-100/80 px-6 py-4 text-xs text-slate-500"
        >
          <p>© 2024 ESmart Solutions Agency. All rights reserved.</p>
          <p class="hidden sm:block">Business hours: 9:00–18:00 ICT</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default { name: "ContactFooter" };
</script>

<style scoped>
footer {
  font-family: "Inter", sans-serif;
}

/* keep icons tidy; container is 32px (h-8 w-8) */
.contact-icon {
  width: 18px !important;
  height: 18px !important;
  max-width: none !important;
  object-fit: contain;
}

/* extra curvature helpers */
.super-rounded {
  border-radius: 2rem;
}
.item-super-rounded {
  border-radius: 1.25rem;
}
</style>
