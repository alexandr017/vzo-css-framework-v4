var faceTagsWrap = document.getElementsByClassName("face-tags")[0];
var faceEl = Array.from(faceTagsWrap.querySelectorAll(".tag-el"));
var faceLoadMore = document.getElementsByClassName("face-more")[0];
var faceLoadLess = document.getElementsByClassName("face-less")[0];

hiddenFaceClass = "hiddenFaceTags";
hiddenItems = Array.from(document.querySelectorAll(".hiddenFaceTags"));
faceLoadLess.style.display = "none";
faceLoadMore.style.display = "none";

faceEl.forEach(function (item, index) {
    if (index >= 5) {
        item.classList.add(hiddenFaceClass);
    }
    if (index > 5) {
        faceLoadMore.style.display = "block";
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
            faceLoadLess.style.display = "block";
        }
    });
});
faceLoadLess.addEventListener("click", function () {
    faceEl.forEach(function (item, index) {
        if (index >= 5) {
            item.classList.add(hiddenFaceClass);
        }
    });
    if (document.querySelectorAll("." + hiddenFaceClass).length !== 5) {
        faceLoadMore.style.display = "block";
        faceLoadLess.style.display = "none";
    }
});

