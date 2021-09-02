let acc = $$(".accordion");
for (let i = 0; i < $$(".accordion").length; i++) {
    console.log(i);
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
            panel.style.borderBottom = null;

        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            this.style.borderBottom = "0";
        }
    });
}