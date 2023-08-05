import data from '../data.js'

function init() {
  const notificationsContent = document.querySelector('.notifications__content')
  const numberOfNotifications = document.querySelector('.notifications__number')
  const markAsRead = document.querySelector('.notifications__button')
  
  let count = 0
  let view = ''
  data.forEach((item) => {
    const div = `
      <div class="notifications__content__card ${
        item.actionPicture ? 'has-image' : ''
      } ${!item.read ? 'unread-background' : ''}">
        <div class="notifications__content__card__image">
          <img src="${item.image}" alt="Picture of ${item.firstName} ${
      item.secondName
    }" />
        </div>
        <div class="notifications__content__card__content">
          <div>
            <a href="#" class="user-name pr">${item.firstName} ${
      item.secondName
    }</a> 
            <span class="notification-type pr">${item.action}</span> 
            ${
              item.group ? `<a href="#" class="group pr">${item.group}</a>` : ''
            }
            <span class="${!item.read ? 'unread' : ''}"></span>
          </div>
          <p class="timestamp">${item.timestamp}</p>
          ${item.message ? `<p class="message">${item.message}</p>` : ''}     
        </div>
					${item.actionPicture ? `<img src="${item.actionPicture}" alt="chess" />` : ''}
      </div>
    `
    view += div
    // Before
    // if (!item.read) {
    //   count++
    // }

    // After
    // Short-circuit conditional
    !item.read && count++
  })

  notificationsContent.innerHTML += view
  numberOfNotifications.innerHTML = count
  const unreadNotification = document.querySelectorAll('.unread')
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

  function removeUnreadDot() {
    for (let i = 0; i < unreadNotification.length; i++) {
      unreadNotification[i].remove()
    }
  }

  function markAllAsRead() {
    // Setting the number of notifications down to 0 when the user clicks "Mark all as read" button
    numberOfNotifications.innerHTML = 0
    // Removing the background color of all unread notifications when the user clicks "Mark all as read" button
    for (let i = 0; i < notificationsContent.children.length; i++) {
      notificationsContent.children[i].classList.remove('unread-background')
    }
    // Removing the span (red dot) for unread messages when the user clicks "Mark all as read" button
    removeUnreadDot()
  }

  // Toggle (show/hide) message on click
  const messageParagraph = document.querySelector('.message')
  messageParagraph.parentElement.parentElement.addEventListener('click', () => {
    messageParagraph.classList.toggle('hidden')
  })

  
  unreadNotification.forEach((notification) => {
    notification.parentElement.parentElement.parentElement.addEventListener(
      'click',
      () => {
        notification.remove()
        decrement()
      }
    )
  })
  markAsRead.addEventListener('click', markAllAsRead)
}

window.addEventListener('DOMContentLoaded', init)
