let navigator = [
  `
    
    <nav>
        <ul>
            <li>
                <a href="/index.html">luxformel</a>
            </li>
            <li class="readme">
                <a href="/index.html">Read Me</a>
            </li>
            <li class="chemie">
                <a href="/Chemie/index.html" >Chemie</a>
            </li>
            <li class="mathe">
                <a href="/Mathe/index.html" >Mathe</a>
            </li>
              <li class="physik">
                <a href="/Physik/index.html" >Physik</a>
            </li> 
            <li class="informatik">
                <a href="/Informatik/index.html" >Informatik</a>
            </li>
             <li class="elektrotechnik">
                <a href="/Elektrotechnik/index.html" >Elektrotechnik</a>
            </li>
            <li class="technologie">
                <a href="/Technologie/index.html" >Technologie</a>
            </li>
            <li class="messtechnik">
                <a href="/Messtechnik/index.html" >Messtechnik</a>
            </li>
            <li class="divers">
                <a href="/Divers/index.html" >Divers</a>
            </li>
            <li>
                <a href="https://search.luxformel.info/"> <i class="material-icons search-icon">search</i> </a>
            </li>
            <li>
                <a onclick="window.print()" href="#"> <i class="material-icons print-icon">print</i> </a>
            </li>
            
        </ul>
    </nav>
    
    `,
];

document.body.insertAdjacentHTML("afterbegin", navigator);
