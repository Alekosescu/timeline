document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observar todos los elementos de la línea de tiempo
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    observer.observe(item);
  });

  // Animación inicial del header
  const header = document.querySelector(".header");
  header.style.opacity = "0";
  header.style.transform = "translateY(-30px)";

  setTimeout(() => {
    header.style.transition = "all 1s ease";
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }, 300);

  // Efecto parallax suave en el scroll
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".timeline-marker");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateX(-50%) translateY(${yPos * 0.1}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);

  // Efecto hover mejorado para los elementos de la línea de tiempo
  timelineItems.forEach((item) => {
    const content = item.querySelector(".timeline-content");
    const marker = item.querySelector(".timeline-marker");

    item.addEventListener("mouseenter", function () {
      marker.style.transform = "translateX(-50%) scale(1.3)";
      marker.style.boxShadow = "0 0 40px rgba(79, 172, 254, 0.9)";
    });

    item.addEventListener("mouseleave", function () {
      marker.style.transform = "translateX(-50%) scale(1)";
      marker.style.boxShadow = "0 0 20px rgba(79, 172, 254, 0.5)";
    });
  });

  // Navegación suave al hacer clic en los marcadores
  const markers = document.querySelectorAll(".timeline-marker");
  markers.forEach((marker) => {
    marker.addEventListener("click", function () {
      const item = this.closest(".timeline-item");
      item.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  });

  // Función para exportar como PDF (usando window.print)
  function exportToPDF() {
    window.print();
  }

  // Agregar botón de exportación (opcional)
  const exportButton = document.createElement("button");
  exportButton.textContent = "Exportar como PDF";
  exportButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

  exportButton.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 6px 20px rgba(79, 172, 254, 0.4)";
  });

  exportButton.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 15px rgba(79, 172, 254, 0.3)";
  });

  exportButton.addEventListener("click", exportToPDF);
  document.body.appendChild(exportButton);

  // Contador de progreso de lectura
  function updateReadingProgress() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    let progressBar = document.querySelector(".reading-progress");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.className = "reading-progress";
      progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 4px;
                background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
                z-index: 9999;
                transition: width 0.3s ease;
            `;
      document.body.appendChild(progressBar);
    } else {
      progressBar.style.width = scrolled + "%";
    }
  }

  window.addEventListener("scroll", updateReadingProgress);
  updateReadingProgress(); // Inicializar
});
