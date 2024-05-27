(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);

// Function to animate the numbers
function animateNumbers(element, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function () {
        current += increment;
        element.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Get all elements with class "subheading-1"
const headings = document.querySelectorAll('.subheading-1');

// Array to hold target values for each statistic
const targets = [1500, 2, 3100]; // Example target values, you can change these

// Iterate through each heading element and animate its corresponding number
headings.forEach((heading, index) => {
    // Create a span element for the number
    const numberElement = document.createElement('span');
    numberElement.className = 'number';
    numberElement.innerHTML = '0'; // Initial value

    // Append the number element to the heading
    heading.appendChild(numberElement);

    // Animate the number from 0 to the target value
    animateNumbers(numberElement, 0, targets[index], 1000); // Adjust duration as needed
});


const canvas = document.querySelector('.webgl')
        const scene = new THREE.Scene()
        const textureLoader = new THREE.TextureLoader()
        const sizes = {
            width: canvas.clientWidth,
            height: canvas.clientHeight
        }

        // Base camera
        const camera = new THREE.PerspectiveCamera(10, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 18
        camera.position.y = 8
        camera.position.z = 20
        scene.add(camera)

        // Controls
        const controls = new THREE.OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.enableZoom = true
        controls.enablePan = false
        controls.minDistance = 20
        controls.maxDistance = 40
        controls.minPolarAngle = Math.PI / 4
        controls.maxPolarAngle = Math.PI / 2
        controls.minAzimuthAngle = - Math.PI / 80
        controls.maxAzimuthAngle = Math.PI / 2.5

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        })

        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputEncoding = THREE.sRGBEncoding

        // Materials
        const bakedTexture = textureLoader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room05/ae27bdffd31dcc5cd5a919263f8f1c6874e05400/baked.jpg')
        bakedTexture.flipY = false
        bakedTexture.encoding = THREE.sRGBEncoding

        const bakedMaterial = new THREE.MeshBasicMaterial({
            map: bakedTexture,
            side: THREE.DoubleSide,
        })

        // Loader
        const loader = new THREE.GLTFLoader()
        loader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room05/ae27bdffd31dcc5cd5a919263f8f1c6874e05400/model.glb',
            (gltf) => {
                const model = gltf.scene
                model.traverse(child => child.material = bakedMaterial)
                scene.add(model)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            }
        )

        const resize = () => {
            sizes.width = canvas.clientWidth
            sizes.height = canvas.clientHeight
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }

        window.addEventListener('resize', resize)

        // Animation
        const tick = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(tick)
        }

        resize()
        tick()

