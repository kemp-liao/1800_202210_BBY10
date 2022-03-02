//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./components/nav.html'));
    console.log($('#footerPlaceholder').load('./components/footer.html'));
    console.log($('#footerFixedPlaceholder').load('./components/footer_fixed.html'));
}
loadSkeleton();  //invoke the function
