//Меняем инфрмацию о пользователе
export function updateUserInfo(avatar, name, about, json){
  name.textContent = json['name'];
  about.textContent = json['about'];
  avatar.src = json['avatar'];
}

export function switchLoadingMessage(target, isLoading){
  if (isLoading){
    target.textContent = 'Сохранение...'
  }
  else {
    target.textContent = 'Сохранить'
  }
}

