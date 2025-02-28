AFRAME.registerComponent('gesture-handler', {
    init: function () {
        this.el.addEventListener('click', () => {
            alert("Has tocado el objeto AR 🚀");
        });
    }
});