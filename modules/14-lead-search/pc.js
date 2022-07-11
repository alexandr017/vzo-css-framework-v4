function clearForm() {
    // document.getElementById("searchQa").value = "";
    location.reload();
    // document.getElementById('searchQaClear').style.display = 'none';
}

if (document.getElementById('searchQaClear') != null) {

    document.getElementById('searchQaClear').style.display = 'none';

    document.getElementById('searchQa').addEventListener('keyup', e => {
        if (e.target.value == "") {
        document.getElementById('searchQaClear').style.display = 'none';
    }
else {
        document.getElementById('searchQaClear').style.display = 'block';
    }
});
}
