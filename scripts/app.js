import data from '../data.json' assert { type: 'json' }

function init() {
  const notificationsContent = document.querySelector('.notifications__content')

  let view = ''
  data.forEach((item) => {
    const div = `
        <div class="notifications__content__card ${
          !item.read ? 'unread-background' : ''
        }">
          <div class="notifications__content__card__image">
            <img src="${item.image}" alt="Picture of ${item.firstName} ${
      item.secondName
    }" />
          </div>
          <div class="notifications__content__card__content">
            <p><a href="#" class="user-name">${item.firstName} ${
      item.secondName
    }</a> <span class="notification-type">${
      item.notificationType
    }</span> <a href="#" class="group">${
      item.group ? item.group : ''
    }</a> <span class="${!item?.read ? 'unread' : ''}"></span></p>
            <p class="timestamp">${item.timestamp}</p>
            ${item.message ? `<p class="message hidden">${item.message}</p>` : ''}     
          </div>
        </div>
    `
    view += div
  })

  notificationsContent.innerHTML += view
  const messageParagraph = document.querySelector('.message')
  messageParagraph.parentElement.parentElement.addEventListener('click', () => {
    messageParagraph.classList.toggle('hidden')
  })
}

window.addEventListener('DOMContentLoaded', init)
