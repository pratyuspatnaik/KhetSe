document.addEventListener("DOMContentLoaded", function() {
    const farmerView = document.getElementById("farmerView");
    const fpoView = document.getElementById("fpoView");

    const btnFarmer1 = document.getElementById("btnFarmer_inFarmer");
    const btnFpo1 = document.getElementById("btnFpo_inFarmer");
    const btnFarmer2 = document.getElementById("btnFarmer_inFpo");
    const btnFpo2 = document.getElementById("btnFpo_inFpo");

    function showFarmer() {
        farmerView.style.display = "block";
        fpoView.style.display = "none";
    }

    function showFpo() {
        farmerView.style.display = "none";
        fpoView.style.display = "block";
    }

    if(btnFarmer1) btnFarmer1.addEventListener("click", showFarmer);
    if(btnFarmer2) btnFarmer2.addEventListener("click", showFarmer);
    if(btnFpo1) btnFpo1.addEventListener("click", showFpo);
    if(btnFpo2) btnFpo2.addEventListener("click", showFpo);
});


document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sidebar Smooth Scroll & Active State Toggle ---
  const sidebarLinks = document.querySelectorAll('aside nav a, aside a[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSidebarLink(link);
        }
      }
    });
  });

  function setActiveSidebarLink(activeLink) {
    sidebarLinks.forEach(link => {
      link.classList.remove('bg-primary/10', 'text-primary', 'font-semibold');
      link.classList.add('text-muted-foreground', 'font-medium');
    });
    activeLink.classList.add('bg-primary/10', 'text-primary', 'font-semibold');
    activeLink.classList.remove('text-muted-foreground', 'font-medium');
  }

  // Active section indicator on window scroll
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSectionId = '#' + section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentSectionId) {
          setActiveSidebarLink(link);
        }
      });
    }
  });

  // --- 2. Geo-coordinates Detection ---
  const detectLocationBtn = document.querySelector('button:has(iconify-icon[icon="lucide:map-pin"])');
  const geoInput = document.querySelector('input[placeholder*="18.5204"]');

  if (detectLocationBtn && geoInput) {
    detectLocationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if ('geolocation' in navigator) {
        detectLocationBtn.disabled = true;
        const originalText = detectLocationBtn.innerText;
        detectLocationBtn.innerText = 'Detecting...';

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude.toFixed(4);
            const lng = position.coords.longitude.toFixed(4);
            geoInput.value = `${lat}° N, ${lng}° E`;
            detectLocationBtn.disabled = false;
            detectLocationBtn.innerHTML = '<iconify-icon icon="lucide:map-pin" class="text-sm"></iconify-icon><span>Detected!</span>';
            setTimeout(() => {
              detectLocationBtn.innerHTML = '<iconify-icon icon="lucide:map-pin" class="text-sm"></iconify-icon><span>Detect</span>';
            }, 2000);
          },
          (error) => {
            detectLocationBtn.disabled = false;
            detectLocationBtn.innerHTML = '<iconify-icon icon="lucide:map-pin" class="text-sm"></iconify-icon><span>Detect</span>';
            alert('Location access denied or unavailable. Please enter coordinates manually.');
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    });
  }

  // --- 3. Crop Management (Add & Remove Crops) ---
  const addCropBtn = document.querySelector('#crop-details button:has(iconify-icon[icon="lucide:plus"])');
  const cropsListContainer = document.querySelector('#crop-details .space-y-4');

  if (cropsListContainer) {
    // Delete existing crops
    cropsListContainer.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('button:has(iconify-icon[icon="lucide:trash-2"])');
      if (deleteBtn) {
        const cropCard = deleteBtn.closest('.bg-background');
        if (cropCard) {
          cropCard.style.transition = 'all 0.3s ease';
          cropCard.style.opacity = '0';
          cropCard.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            cropCard.remove();
            updateCompletenessMeter();
          }, 300);
        }
      }
    });
  }

  if (addCropBtn && cropsListContainer) {
    addCropBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cropName = prompt('Enter Crop Name (e.g. Organic Wheat, Sugarcane):');
      if (!cropName || cropName.trim() === '') return;

      const estimatedYield = prompt('Enter Estimated Yield in Quintals (e.g. 50):') || '0';

      const newCropCard = document.createElement('div');
      newCropCard.className = 'bg-background rounded-xl p-4 border border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all';
      newCropCard.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="bg-primary/10 text-primary p-2.5 rounded-xl font-bold text-lg flex items-center justify-center w-12 h-12">
            🌱
          </div>
          <div>
            <h4 class="font-heading font-bold text-sm text-foreground">${escapeHtml(cropName)}</h4>
            <p class="text-xs text-muted-foreground">Harvest Cycle: <span class="font-semibold text-foreground">Active Cycle</span></p>
            <p class="text-[10px] text-primary font-medium mt-1">Status: Listed on Profile</p>
          </div>
        </div>
        <div class="flex items-center gap-8">
          <div class="text-right">
            <span class="text-xs text-muted-foreground block">Estimated Yield</span>
            <span class="font-heading font-bold text-sm text-foreground">${escapeHtml(estimatedYield)} Quintals</span>
          </div>
          <button class="text-muted-foreground hover:text-destructive p-1.5 transition-colors">
            <iconify-icon icon="lucide:trash-2" class="text-lg"></iconify-icon>
          </button>
        </div>
      `;
      cropsListContainer.appendChild(newCropCard);
      updateCompletenessMeter();
    });
  }

  // Helper to escape HTML strings
  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // --- 4. Profile Completeness Meter ---
  const completenessProgressBar = document.querySelector('aside .bg-primary.h-full');
  const completenessPercentageText = document.querySelector('aside .font-bold.text-primary');

  function updateCompletenessMeter() {
    const inputs = document.querySelectorAll('main input[type="text"], main input[type="tel"], main textarea');
    let filledCount = 0;
    inputs.forEach(input => {
      if (input.value && input.value.trim() !== '') {
        filledCount++;
      }
    });

    const cropCount = document.querySelectorAll('#crop-details .space-y-4 > div').length;
    let totalScore = Math.min(100, Math.round((filledCount / inputs.length) * 70 + (cropCount > 0 ? 30 : 0)));

    if (completenessProgressBar) completenessProgressBar.style.width = `${totalScore}%`;
    if (completenessPercentageText) completenessPercentageText.innerText = `${totalScore}%`;
  }

  // Add event listeners to input fields for completeness updates
  const formInputs = document.querySelectorAll('main input, main textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', updateCompletenessMeter);
  });

  // --- 5. Form Save Action ---
  const saveBtn = document.querySelector('button:has(iconify-icon[icon="lucide:circle-check"])');
  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      saveBtn.disabled = true;
      const originalHTML = saveBtn.innerHTML;
      saveBtn.innerHTML = '<iconify-icon icon="lucide:loader" class="text-sm animate-spin"></iconify-icon><span>Saving...</span>';

      setTimeout(() => {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<iconify-icon icon="lucide:check-circle-2" class="text-sm"></iconify-icon><span>Saved Successfully!</span>';
        
        // Temporary feedback notification
        showToast('Farmer profile updated successfully!');

        setTimeout(() => {
          saveBtn.innerHTML = originalHTML;
        }, 2500);
      }, 1000);
    });
  }

  // Toast notification helper
  function showToast(message) {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'custom-toast';
      toast.className = 'fixed bottom-6 right-6 bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 z-50 text-sm font-semibold transition-all transform translate-y-10 opacity-0';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<iconify-icon icon="lucide:check-circle" class="text-lg"></iconify-icon><span>${escapeHtml(message)}</span>`;
    
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
    }, 3000);
  }
});

