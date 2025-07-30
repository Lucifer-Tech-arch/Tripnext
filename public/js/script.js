
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()

 document.addEventListener("DOMContentLoaded", () => {
  const passicon = document.getElementById("passimg");
  const input = document.getElementById("password");
  const switchtoggle = document.getElementById("switchCheckReverse");
  const taxinfo = document.getElementsByClassName("tax-info");

  // Toggle password visibility
  if (passicon && input) {
    passicon.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        passicon.src = "/images/eye-close.png";
      } else {
        input.type = "password";
        passicon.src = "/images/eye-open.png";
      }
    });
  }

  // Toggle tax info visibility
  if (switchtoggle) {
    switchtoggle.addEventListener("change", () => {
      const show = switchtoggle.checked ? "inline" : "none";
      for (let info of taxinfo) {
        info.style.display = show;
      }
    });
  }
});

