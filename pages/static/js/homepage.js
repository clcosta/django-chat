const user = document.getElementById("username")
const sendBtn = document.getElementById("join")
const invalid = document.getElementById("invalid")

const is_valid_name = () =>{
    if (!user.value || user.value.length < 3){
        user.className = "text-grey-darkest py-2 px-3 border border-1 border-rose-700 focus:ring-indigo-500 focus:border-indigo-500 rounded"
        invalid.textContent = "Preencha este campo corretamente!"
        return false
    }
    user.className = "text-grey-darkest py-2 px-3 border border-1 border-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 rounded"
    invalid.textContent = ""
    return true
}

user.addEventListener("focusout", is_valid_name)


sendBtn.addEventListener("click", () => {
    if (is_valid_name()){
        let userEncode = encodeURIComponent(user.value)
        window.location.replace(`${window.location}chat/?user=${userEncode}`)
    }
})