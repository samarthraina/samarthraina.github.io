document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const primaryNav = document.querySelector(".site-nav .nav-links");

if (primaryNav) {
  const siteClock = document.createElement("span");
  siteClock.className = "site-clock";
  siteClock.title = "Local time in India, Indian Standard Time";
  siteClock.setAttribute("aria-label", "Local time in India");
  siteClock.innerHTML = '<span class="clock-zone">IST</span><span data-ist-clock>Loading</span>';
  primaryNav.append(siteClock);
}

const istFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

const updateISTClock = () => {
  const localTime = `${istFormatter.format(new Date())} IST`;
  document.querySelectorAll("[data-ist-clock]").forEach((el) => {
    el.textContent = localTime;
  });
};

updateISTClock();
window.setInterval(updateISTClock, 1000);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
