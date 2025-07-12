document.addEventListener("DOMContentLoaded", function(){
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const rejectBtn = document.getElementById("reject-cookies");

    if(!localStorage.getItem("cookies-consent")){
        banner.style.display = "block";
    }
    if(localStorage.getItem("cookies-consent") === "accepted"){
        const script = document.createElement("script");
        script.src = 'http://example.com/tracker.js';
        document.head.appendChild(script);
    }

    acceptBtn.onclick = () => {
        localStorage.setItem("cookies-consent", "accepted");
        banner.style.display = "none";

    };
    rejectBtn.onclick = () => {
        localStorage.setItem("cookies-consent", "rejected");
        banner.style.display = "none";
    }
})

    function acceptCookies() {
      localStorage.setItem("cookies-consent", "accepted");
      hideBanners();
    }
    function rejectCookies() {
      localStorage.setItem("cookies-consent", "rejected");
      hideBanners();
    }
    function hideBanners() {
      document.getElementById("cookie-banner-gdpr").classList.add("hidden");
      document.getElementById("cookie-banner-ccpa").classList.add("hidden");
    }
    
    // Check if consent already set
    if (!localStorage.getItem("cookies-consent")) {
      fetch("https://ipapi.co/json") // Get user location
        .then((res) => res.json())
        .then((data) => {
          const country = data.country_code;
    
          if (["FR", "DE", "NL", "IT", "SE", "ES", "IE"].includes(country)) {
            document.getElementById("cookie-banner-gdpr").classList.remove("hidden");
          } else if (country === "US") {
            document.getElementById("cookie-banner-ccpa").classList.remove("hidden");
          } else {
            document.getElementById("cookie-banner-gdpr").classList.remove("hidden");
          }
        })
        .catch(() => {
          // Fallback
          document.getElementById("cookie-banner-gdpr").classList.remove("hidden");
        });
    }