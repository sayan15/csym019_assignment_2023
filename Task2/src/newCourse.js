function addModules(){
    //get modules container
    var container=document.getElementById("modulesContainer");
    //create div and assign class
    var div = document.createElement("div");
      div.classList.add("inner_Blocks_content");
      //create label 
      var label = document.createElement("label");
      label.textContent = "";
      div.appendChild(label);
      div.appendChild(document.createElement("br"));

      //create input requirement name field
      var module = document.createElement("input");
      module.type = "text";
      module.name = "requirement[]";
      module.required = true;
      module.placeholder = "requirement";
      div.appendChild(module);
    
      //create credit field
      var credit = document.createElement("input");
      credit.type = "number";
      credit.name = "credit[]";
      credit.required = true;
      credit.placeholder = "credit";
      div.appendChild(credit);

      // create delete button if we user want to delete those fields
      var moduledeleteButton = document.createElement("button");
      moduledeleteButton .type = "button";
      moduledeleteButton .textContent = "Delete";
      moduledeleteButton .addEventListener("click", function() {
        div.remove();
      });

      div.appendChild(moduledeleteButton );

      container.appendChild(div);
}

//add requirement function
function addRequirement(){
    //get requirements container
    var container=document.getElementById("requirementContainer");
    //create div and assign class
    var div = document.createElement("div");
      div.classList.add("inner_Blocks_content");
      //create label 
      var label = document.createElement("label");
      label.textContent = "";
      div.appendChild(label);
      div.appendChild(document.createElement("br"));

      //create input requirement field
      var requirement = document.createElement("textarea");
      requirement.name = "requirement[]";
      requirement.required = true;
      requirement.placeholder = "requirement";
      requirement.rows=4,
      requirement.cols=30
      div.appendChild(requirement);
    

      // create delete button if we user want to delete those fields
      var requirementdeleteButton = document.createElement("button");
      requirementdeleteButton.type = "button";
      requirementdeleteButton.textContent = "Delete";
      requirementdeleteButton.addEventListener("click", function() {
        div.remove();
      });

      div.appendChild(requirementdeleteButton);

      container.appendChild(div);
}

//add new faqs
function addFaq(){
    
}