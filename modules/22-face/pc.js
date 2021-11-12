if(document.getElementsByClassName("face-tags").length != 0) {
    let faceTagsWrap = document.getElementsByClassName("face-tags")[0];
    let faceEl = Array.from(faceTagsWrap.querySelectorAll(".tag-el"));
    let faceLoadMore = document.getElementsByClassName("face-more")[0];
    let faceLoadLess = document.getElementsByClassName("face-less")[0];

    hiddenFaceClass = "hiddenFaceTags";
    faceLoadLess.style.display = "none";
    faceLoadMore.style.display = "none";

    faceEl.forEach(function (item, index) {
        if (index >= 5) {
            item.classList.add(hiddenFaceClass);
        }
        if (index > 5) {
            faceLoadMore.style.display = "flex";
        }
    });
    faceLoadMore.addEventListener("click", function () {
        [].forEach.call(document.querySelectorAll("." + hiddenFaceClass), function (
            item,
            index
        ) {
            item.classList.remove(hiddenFaceClass);
            if (document.querySelectorAll("." + hiddenFaceClass).length === 0) {
                faceLoadMore.style.display = "none";
                faceLoadLess.style.display = "flex";
            }
        });
    });
    faceLoadLess.addEventListener("click", function () {
        faceEl.forEach(function (item, index) {
            if (index >= 5) {
                item.classList.add(hiddenFaceClass);
            }
        });
        if (document.querySelectorAll("." + hiddenFaceClass).length <= 5) {
            faceLoadMore.style.display = "flex";
            faceLoadLess.style.display = "none";
        }
    });
}

