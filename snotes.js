   
    // passa em cima do baguio e faze animação
        var item = document.getElementById("#bloconotas1","#bdnonline1");
        item.addEventListener("mouseover", mousep, false);
        item.addEventListener("mouseout", mousep1, false);
        
        function mousep()
        {  
           item.setAttribute("style", "transform: scale(1.1)")
        }
        
        function mousep1()
        {  
           item.setAttribute("style", "transform: scale(1)")
        }
        