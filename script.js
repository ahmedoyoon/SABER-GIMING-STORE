document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد 2 ثانية
    setTimeout(function() {
        document.querySelector('.loading-animation').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-animation').style.display = 'none';
        }, 500);
    }, 2000);

    // تغيير شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // زر العودة للأعلى
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // زر العودة للأعلى
    document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // عدادات الإحصائيات
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-count');
        const count = +stat.innerText;
        const increment = target / 100;

        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            stat.innerText = target;
        }

        function updateCount() {
            const current = +stat.innerText;
            if (current < target) {
                stat.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 10);
            } else {
                stat.innerText = target;
            }
        }
    });

    // تنشيط العدادات عند التمرير إليها
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = +stat.getAttribute('data-count');
                const count = +stat.innerText;
                const increment = target / 100;

                if (count < target) {
                    stat.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    stat.innerText = target;
                }

                function updateCount() {
                    const current = +stat.innerText;
                    if (current < target) {
                        stat.innerText = Math.ceil(current + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        stat.innerText = target;
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        observer.observe(stat);
    });

    // قائمة الهاتف الجوال
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // تأثيرات للبطاقات عند التمرير
    const productCards = document.querySelectorAll('.product-card');
    const featureCards = document.querySelectorAll('.feature-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach(card => {
        cardObserver.observe(card);
    });

    featureCards.forEach(card => {
        cardObserver.observe(card);
    });

    // تأثيرات للعناوين
    const headings = document.querySelectorAll('.section-header h2, .section-header p');

    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    headings.forEach(heading => {
        headingObserver.observe(heading);
    });

    // تأثيرات للزر عند التحويم
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // تفعيل روابط التواصل الاجتماعي في الفوتر
    document.querySelectorAll('.social-icons a').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    });

    // تفعيل روابط الفوتر
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// دالة الطلب عبر واتساب
function orderViaWhatsApp(productName) {
    const whatsappUrl = `https://wa.me/201031400423?text=مرحباً، أريد شراء ${encodeURIComponent(productName)} من Gangste Store`;
    window.open(whatsappUrl, '_blank');
}