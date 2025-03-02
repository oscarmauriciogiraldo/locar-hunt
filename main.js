import AFRAME from 'aframe'
AFRAME.registerComponent('desaparecer-al-tocar', {
    init: function () {
      console.log('Objeto: cofre registrado')

      let el = this.el;
      let escalaInicial = el.getAttribute('scale');

      let textoGanaste = document.getElementById('ganaste-text');
      //let nuevoModelo = document.getElementById('nuevoModelo');

      //Variable de control booleana
      let tesoroRecogido = false;

      el.addEventListener('click', function () {
        console.log('objeto tocado')

        if (!this.tesoroRecogido) {
          this.tesoroRecogido = true;
          console.log("Tesoro recogido:", this.tesoroRecogido);

          // Animación para reducir tamaño
          el.setAttribute('animation', {
            property: 'scale',
            to: '0 0 0',
            dur: 1000,
            easing: 'easeOutQuad'
          });

          // Desactivar el objeto y mostrar el texto
          setTimeout(() => {
            el.setAttribute('visible', false);
            textoGanaste.setAttribute('visible', true);
          }, 1000);
        }

      });
    }
  });