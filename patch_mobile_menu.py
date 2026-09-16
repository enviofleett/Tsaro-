import os
import re

files_to_patch = ['index.html', 'about.html', 'academy.html', 'clientele.html', 'products-services.html']
base_dir = 'wix-design-template'

action_regex = re.compile(r'<!-- Action -->.*?</div>\s*</div>\s*</header>', re.DOTALL)

replacement_html = """<!-- Action -->
            <div class="flex items-center gap-4">
                <a href="#contact" class="hidden sm:flex btn-primary-red px-5 py-2.5 rounded text-xs font-semibold tracking-wider uppercase items-center gap-2">
                    <span>Secure Consultation</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
                
                <!-- Mobile Menu Toggle -->
                <button id="mobileMenuBtn" class="md:hidden text-textLight hover:text-white focus:outline-none transition-colors">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path id="mobileMenuIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div id="mobileMenu" class="hidden md:hidden absolute top-full left-0 w-full glass-nav border-t border-white/10 flex flex-col shadow-2xl">
            <nav class="flex flex-col px-6 py-6 gap-4 text-sm font-medium text-textLight">
                <a href="index.html" class="hover:text-white transition-colors">Home</a>
                <a href="about.html" class="hover:text-white transition-colors">About Us</a>
                <a href="products-services.html" class="hover:text-white transition-colors">Products & Services</a>
                <a href="academy.html" class="hover:text-white transition-colors">Academy</a>
                <a href="clientele.html" class="hover:text-white transition-colors">Clientele</a>
                <a href="#contact" class="hover:text-white transition-colors">Contact</a>
                
                <a href="#contact" class="mt-2 btn-primary-red px-5 py-3 rounded text-xs font-semibold tracking-wider uppercase flex justify-center items-center gap-2 w-full text-center text-white">
                    <span>Secure Consultation</span>
                </a>
            </nav>
        </div>
    </header>"""

js_snippet = """
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuIcon = document.getElementById('mobileMenuIcon');

        if (mobileMenuBtn && mobileMenu && mobileMenuIcon) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenuIcon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
                } else {
                    mobileMenuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
                }
            });
        }
"""

for fname in files_to_patch:
    filepath = os.path.join(base_dir, fname)
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Check if already patched
    if 'mobileMenuBtn' in content:
        print(f"Already patched {fname}")
        continue
        
    # Patch HTML
    content = action_regex.sub(replacement_html, content)
    
    # Patch JS (inject right before </script>)
    # Find the last </script> tag
    script_end_idx = content.rfind('</script>')
    if script_end_idx != -1:
        content = content[:script_end_idx] + js_snippet + content[script_end_idx:]
        
    with open(filepath, 'w') as f:
        f.write(content)
        
    print(f"Successfully patched {fname}")

