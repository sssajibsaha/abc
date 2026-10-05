// HookCraft Application Core Logic

// Platform Configurations & Character Limits
const PLATFORMS = {
    tiktok: {
        name: 'TikTok',
        maxChars: 150, // Optimal hook title limit before overlay clipping
        label: 'TikTok Hook Limit',
        color: 'bg-emerald-600',
        activeBtnClass: 'bg-emerald-600 text-white font-semibold'
    },
    shorts: {
        name: 'YouTube Shorts',
        maxChars: 100,
        label: 'Shorts Title Limit',
        color: 'bg-red-600',
        activeBtnClass: 'bg-red-600 text-white font-semibold'
    },
    reels: {
        name: 'Instagram Reels',
        maxChars: 125, // First 125 chars shown before "...more" button
        label: 'Reels Hook Limit',
        color: 'bg-pink-600',
        activeBtnClass: 'bg-pink-600 text-white font-semibold'
    },
    twitter: {
        name: 'X / Twitter',
        maxChars: 280,
        label: 'Post Character Limit',
        color: 'bg-slate-900',
        activeBtnClass: 'bg-slate-900 text-white font-semibold'
    },
    linkedin: {
        name: 'LinkedIn',
        maxChars: 210, // First 210 chars shown before "...see more"
        label: 'LinkedIn See More Cutoff',
        color: 'bg-blue-600',
        activeBtnClass: 'bg-blue-600 text-white font-semibold'
    }
};

let currentPlatform = 'tiktok';

// High-Impact Power & Curiosity Words Dictionary
const POWER_WORDS = [
    'secret', 'secrets', 'stop', 'never', 'proven', 'hack', 'hacks', 'mistake', 'mistakes',
    'how to', 'crazy', 'insane', 'free', 'easiest', 'fastest', 'guaranteed', 'effortless',
    'ultimate', 'genius', 'unreal', 'banned', 'exposed', 'truth', 'warning', 'life-changing',
    'don\'t', 'don’t', 'avoid', 'why', 'simple', 'hidden', 'growth', 'money', 'viral', 'algorithm'
];

// High-Converting Viral Hook Templates Library
const HOOK_TEMPLATES = [
    {
        category: 'curiosity',
        title: 'The Unfair Advantage Hook',
        text: 'This feels illegal to know: How I [achieved target goal] in under [timeframe] without [common annoyance]...'
    },
    {
        category: 'negative',
        title: 'Stop Making This Mistake',
        text: 'Stop [common action] if you want to [desired result]. Do this 1 simple step instead:'
    },
    {
        category: 'curiosity',
        title: 'Secret Hack Reveal',
        text: 'The secret algorithm hack that [target platform] doesn\'t want you to know about in 2025:'
    },
    {
        category: 'story',
        title: 'Zero to Hero Journey',
        text: 'I spent [number] days testing [technique/tool] so you don\'t have to. Here are the unbelievable results:'
    },
    {
        category: 'list',
        title: '3 Golden Rules List',
        text: '3 simple rules to [desired outcome] (Number 2 will completely change how you think):'
    },
    {
        category: 'negative',
        title: 'Warning / Avoid Disaster',
        text: 'Whatever you do, NEVER [common mistake] when trying to [goal]. Here is why:'
    },
    {
        category: 'story',
        title: 'My Favorite Secret Tool',
        text: 'If I lost everything and had to restart [topic] from scratch, I would use this 1 free tool:'
    },
    {
        category: 'list',
        title: '5 Fast Tips',
        text: '5 underrated websites that feel like cheat codes for [profession/hobby]:'
    },
    {
        category: 'curiosity',
        title: 'The Truth About Topic',
        text: 'Nobody is talking about this [industry] truth, but you need to know before it\'s too late...'
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadAdminSettings();
    renderTemplates('all');

    const hookInput = document.getElementById('hook-input');
    if (hookInput) {
        hookInput.addEventListener('input', analyzeText);
        // Initial trigger
        analyzeText();
    }
});

// Switch Selected Social Media Platform
function switchPlatform(platformKey) {
    if (!PLATFORMS[platformKey]) return;
    currentPlatform = platformKey;

    // Reset button states
    Object.keys(PLATFORMS).forEach(key => {
        const btn = document.getElementById(`btn-${key}`);
        if (btn) {
            btn.className = 'platform-tab flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition';
        }
    });

    // Set active button state
    const activeBtn = document.getElementById(`btn-${platformKey}`);
    if (activeBtn) {
        activeBtn.className = `platform-tab flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg ${PLATFORMS[platformKey].activeBtnClass} transition shadow-sm`;
    }

    // Update Platform Limit Label
    const limitLabel = document.getElementById('platform-limit-label');
    if (limitLabel) {
        limitLabel.innerText = PLATFORMS[platformKey].label;
    }

    // Re-analyze text with new limits
    analyzeText();
}

// Main Real-time Analysis Engine
function analyzeText() {
    const input = document.getElementById('hook-input');
    const text = input ? input.value : '';
    const charCount = text.length;
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const wordCount = words.length;

    const maxLimit = PLATFORMS[currentPlatform].maxChars;

    // 1. Update Character Display & Progress Bar
    const charDisplay = document.getElementById('char-count-display');
    const progressBar = document.getElementById('progress-bar');
    if (charDisplay) charDisplay.innerText = `${charCount} / ${maxLimit} chars`;

    const percentage = Math.min(Math.round((charCount / maxLimit) * 100), 100);
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        if (charCount > maxLimit) {
            progressBar.className = 'bg-red-500 h-2.5 rounded-full transition-all duration-300';
            if (charDisplay) charDisplay.className = 'text-red-600 font-bold';
        } else {
            progressBar.className = 'bg-emerald-500 h-2.5 rounded-full transition-all duration-300';
            if (charDisplay) charDisplay.className = 'text-slate-500 font-semibold';
        }
    }

    // 2. Metrics
    document.getElementById('stat-words').innerText = wordCount;

    // First 3 Words
    const first3 = words.slice(0, 3).join(' ');
    document.getElementById('stat-first3').innerText = first3 ? `"${first3}"` : '-';

    // Reading time (Avg 200 wpm = ~3.3 words/sec)
    const readSecs = wordCount > 0 ? Math.max(1, Math.round(wordCount / 3.3)) : 0;
    document.getElementById('stat-readtime').innerText = `${readSecs}s`;

    // 3. Power Word Analysis
    const textLower = text.toLowerCase();
    const detectedPowerWords = [];

    POWER_WORDS.forEach(pw => {
        if (textLower.includes(pw)) {
            detectedPowerWords.push(pw);
        }
    });

    document.getElementById('stat-powercount').innerText = detectedPowerWords.length;

    // Render Power Word Badges
    const powerContainer = document.getElementById('power-words-container');
    if (powerContainer) {
        if (detectedPowerWords.length === 0) {
            powerContainer.innerHTML = `<span class="text-xs bg-slate-100 text-slate-400 px-3 py-1 rounded-full italic">No power words detected yet</span>`;
        } else {
            powerContainer.innerHTML = detectedPowerWords.map(pw =>
                `<span class="text-xs bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full border border-emerald-200">
                    <i class="fa-solid fa-bolt text-amber-500 mr-1"></i>${pw}
                </span>`
            ).join('');
        }
    }

    // 4. Hook Score Calculation
    let score = 0;
    if (wordCount > 0) {
        // Base points for length
        if (charCount >= 20 && charCount <= maxLimit) score += 35;
        else if (charCount > 0) score += 15;

        // Power words boost (15 pts each up to 30)
        score += Math.min(detectedPowerWords.length * 15, 35);

        // Contains Numbers / List indicator
        const hasNumber = /\d+/.test(text);
        if (hasNumber) score += 15;

        // Question mark or Curiosity gap
        if (text.includes('?') || text.includes('...') || text.includes(':')) score += 15;
    }

    score = Math.min(score, 100);

    // Update Circle & Score Text
    const scoreVal = document.getElementById('score-value');
    const scoreCircle = document.getElementById('score-circle');
    if (scoreVal) scoreVal.innerText = `${score}%`;

    if (scoreCircle) {
        scoreCircle.setAttribute('stroke-dasharray', `${score}, 100`);
        if (score >= 70) {
            scoreCircle.setAttribute('class', 'text-emerald-500 stroke-current transition-all duration-500 ease-out');
        } else if (score >= 40) {
            scoreCircle.setAttribute('class', 'text-amber-500 stroke-current transition-all duration-500 ease-out');
        } else {
            scoreCircle.setAttribute('class', 'text-red-500 stroke-current transition-all duration-500 ease-out');
        }
    }

    // 5. Dynamic Feedback Updates
    updateFeedback('feedback-power', detectedPowerWords.length > 0,
        'Power / Curiosity words detected!',
        'Add power/curiosity words (e.g. Secret, Stop, Proven, How To)');

    updateFeedback('feedback-length', charCount > 0 && charCount <= maxLimit,
        `Perfect length for ${PLATFORMS[currentPlatform].name}!`,
        `Keep title within platform limit (${maxLimit} chars)`);

    const hasNum = /\d+/.test(text);
    updateFeedback('feedback-numbers', hasNum,
        'Numbers / specifics included (e.g. 3 ways, $100k)',
        'Include numbers or specific lists (e.g. 3 ways, 5 mistakes)');

    // 6. Update Live Mobile Phone Screen Preview
    const mobilePreview = document.getElementById('mobile-preview-text');
    if (mobilePreview) {
        mobilePreview.innerText = text.trim() || 'Stop wasting time on bad captions! Here are 3 secret psychological hooks that get 1M+ views...';
    }
}

// Helper to Update Analysis Feedback Item
function updateFeedback(elementId, isPositive, successMsg, failMsg) {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (isPositive) {
        el.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-500"></i><span class="text-slate-800 font-medium">${successMsg}</span>`;
    } else {
        el.innerHTML = `<i class="fa-solid fa-circle-xmark text-red-400"></i><span class="text-slate-500">${failMsg}</span>`;
    }
}

// Clear Text Action
function clearText() {
    const input = document.getElementById('hook-input');
    if (input) {
        input.value = '';
        analyzeText();
        input.focus();
    }
}

// Copy Text Action
function copyText() {
    const input = document.getElementById('hook-input');
    if (!input || !input.value.trim()) {
        showToast('Nothing to copy yet!', 'error');
        return;
    }

    navigator.clipboard.writeText(input.value).then(() => {
        showToast('Hook copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy text', 'error');
    });
}

// Render Templates Grid
function renderTemplates(category = 'all') {
    const grid = document.getElementById('templates-grid');
    if (!grid) return;

    const filtered = category === 'all'
        ? HOOK_TEMPLATES
        : HOOK_TEMPLATES.filter(t => t.category === category);

    grid.innerHTML = filtered.map((tmpl, idx) => `
        <div class="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div>
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">${tmpl.category}</span>
                    <button onclick="useTemplate('${escapeHtml(tmpl.text)}')" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 opacity-90 group-hover:opacity-100 flex items-center gap-1">
                        <span>Use This</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
                <h4 class="text-sm font-bold text-slate-800 mb-1">${tmpl.title}</h4>
                <p class="text-xs text-slate-600 leading-relaxed italic">"${tmpl.text}"</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                <span>1-Click Load</span>
                <i class="fa-solid fa-wand-magic-sparkles text-emerald-500"></i>
            </div>
        </div>
    `).join('');
}

// Filter Templates Action
function filterTemplates(category) {
    // Update button active styles
    const buttons = document.querySelectorAll('.tmpl-filter');
    buttons.forEach(btn => {
        btn.className = 'tmpl-filter px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition';
    });

    event.target.className = 'tmpl-filter px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium transition';
    renderTemplates(category);
}

// Use Template in Editor
function useTemplate(text) {
    const input = document.getElementById('hook-input');
    if (input) {
        input.value = text;
        analyzeText();
        window.scrollTo({ top: document.getElementById('optimizer').offsetTop - 80, behavior: 'smooth' });
        showToast('Template loaded into Hook Optimizer!', 'success');
    }
}

// Helper Toast Notification
function showToast(message, type = 'success') {
    const existing = document.getElementById('toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    const bg = type === 'success' ? 'bg-slate-900 text-white border-emerald-500' : 'bg-red-600 text-white border-red-700';

    toast.className = `fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl border-l-4 ${bg} shadow-xl flex items-center space-x-2 text-xs font-semibold animate-bounce`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-circle-exclamation'} text-sm"></i><span>${message}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast) toast.remove();
    }, 3000);
}

// Modals Management
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
}

// Admin / Site Settings Management
function loadAdminSettings() {
    const settings = JSON.parse(localStorage.getItem('hookcraft_settings') || '{}');

    // Populate Admin Form Fields
    if (document.getElementById('cfg-site-title')) {
        document.getElementById('cfg-site-title').value = settings.siteTitle || 'HookCraft';
    }
    if (document.getElementById('cfg-ga4-id')) {
        document.getElementById('cfg-ga4-id').value = settings.ga4Id || '';
    }
    if (document.getElementById('cfg-gsc-code')) {
        document.getElementById('cfg-gsc-code').value = settings.gscCode || '';
    }
    if (document.getElementById('cfg-adsense-id')) {
        document.getElementById('cfg-adsense-id').value = settings.adsenseId || '';
    }

    applySettings(settings);
}

function saveAdminSettings(event) {
    event.preventDefault();

    const settings = {
        siteTitle: document.getElementById('cfg-site-title').value.trim() || 'HookCraft',
        ga4Id: document.getElementById('cfg-ga4-id').value.trim(),
        gscCode: document.getElementById('cfg-gsc-code').value.trim(),
        adsenseId: document.getElementById('cfg-adsense-id').value.trim()
    };

    localStorage.setItem('hookcraft_settings', JSON.stringify(settings));
    applySettings(settings);
    closeModal('admin-modal');
    showToast('Site Settings & GA4/AdSense updated successfully!', 'success');
}

function resetAdminSettings() {
    localStorage.removeItem('hookcraft_settings');
    loadAdminSettings();
    closeModal('admin-modal');
    showToast('Settings reset to defaults', 'success');
}

function applySettings(settings) {
    // Update Title & Brand Text
    const brandName = settings.siteTitle || 'HookCraft';
    document.title = `${brandName} - Social Media Hook & Title Optimizer | TikTok, Shorts, Reels`;

    const logoText = document.getElementById('site-logo-text');
    if (logoText) logoText.innerText = brandName;

    const footerBrand = document.getElementById('footer-brand-name');
    if (footerBrand) footerBrand.innerText = brandName;

    // Update Search Console Meta Tag
    const gscMeta = document.getElementById('gsc-meta-tag');
    if (gscMeta && settings.gscCode) {
        gscMeta.setAttribute('content', settings.gscCode);
    }

    // Dynamic GA4 and AdSense Injection
    const container = document.getElementById('analytics-adsense-container');
    if (container) {
        let injectedHTML = '';

        // Inject GA4 if present
        if (settings.ga4Id && !document.getElementById('ga4-script')) {
            const ga4Script = document.createElement('script');
            ga4Script.id = 'ga4-script';
            ga4Script.async = true;
            ga4Script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.ga4Id}`;
            document.head.appendChild(ga4Script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', settings.ga4Id);
        }

        // Inject AdSense Script if present
        if (settings.adsenseId && !document.getElementById('adsense-script')) {
            const adScript = document.createElement('script');
            adScript.id = 'adsense-script';
            adScript.async = true;
            adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adsenseId}`;
            adScript.crossOrigin = 'anonymous';
            document.head.appendChild(adScript);

            // Update AdSense Placeholder text to reflect active Pub ID
            document.querySelectorAll('.ad-content').forEach(el => {
                el.innerText = `AdSense Active (${settings.adsenseId})`;
            });
        }
    }
}

// Utility: Escape HTML for safe string insertion
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
