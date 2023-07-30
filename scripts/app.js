import data from '../data.js'

function init() {
  const notificationsContent = document.querySelector('.notifications__content')
  const numberOfNotifications = document.querySelector('.notifications__number')
  const markAsUnread = document.querySelector('.notifications__button')

  let count = 0
  let view = ''
  data.forEach((item) => {
    const div = `
      <div class="notifications__content__card ${item.actionPicture ? 'has-image' : ''} ${!item.read ? 'unread-background' : ''}">
        <div class="notifications__content__card__image">
          <img src="${item.image}" alt="Picture of ${item.firstName} ${item.secondName}" />
        </div>
        <div class="notifications__content__card__content">
          <div>
            <a href="#" class="user-name pr">${item.firstName} ${item.secondName}</a> 
            <span class="notification-type pr">${item.action}</span> 
            ${item.group ? `<a href="#" class="group pr">${item.group}</a>` : ''}
            <span class="${!item.read ? 'unread' : ''}"></span>
          </div>
          <p class="timestamp">${item.timestamp}</p>
          ${item.message ? `<p class="message">${item.message}</p>` : ''}     
        </div>
					${item.actionPicture ? `<img src="${item.actionPicture}" alt="chess" />` : ''}
      </div>
    `
    view += div
    if (!item.read) {
      count++
    }
  })

  notificationsContent.innerHTML += view
  numberOfNotifications.innerHTML = count
  const unreadNotifications = document.querySelectorAll('.unread-background')
  unreadNotifications.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.remove('unread-background')
    })
  })

  function decrement() {
    if (count > 0) {
      numberOfNotifications.innerHTML = count -= 1
    }
  }

  function markAllAsUnread() {
    numberOfNotifications.innerHTML = 0
    for (let i = 0; i < notificationsContent.children.length; i++) {
      if (
        notificationsContent.children[i].classList.contains('unread-background')
      ) {
        notificationsContent.children[i].classList.remove('unread-background')
      }
    }

    for (let i = 0; i < unreadNotification.length; i++) {
      unreadNotification[i].classList.contains('unread')
        ? unreadNotification[i].remove()
        : ''
    }
  }

  const messageParagraph = document.querySelector('.message')
  messageParagraph.parentElement.parentElement.addEventListener('click', () => {
    messageParagraph.classList.toggle('hidden')
  })

  const unreadNotification = document.querySelectorAll('.unread')
  unreadNotification.forEach((notification) => {
    notification.parentElement.parentElement.parentElement.addEventListener(
      'click',
      () => {
        notification.remove()
        decrement()
      }
    )
  })
  markAsUnread.addEventListener('click', markAllAsUnread)
}

window.addEventListener('DOMContentLoaded', init)
