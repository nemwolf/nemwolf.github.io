document.getElementById('year').textContent = new Date().getFullYear();

function unHidePlush()
{
    
    if (document.getElementById('plush_image').style.display==="block")
    {
        document.getElementById('plush_image').style.display="none"
    }
    else
    {
        document.getElementById('plush_image').style.display="block";
    }
}