document.getElementById('year').textContent = new Date().getFullYear();

//will unhide element
//TODO: make this function take in any element, not just this
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