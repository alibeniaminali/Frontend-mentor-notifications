import data from '../data.js'

function init() {
  const notificationsContentContainer = document.querySelector('.notifications__content')
  const numberOfNotifications = document.querySelector('.notifications__number')
  const markAllAsRead = document.querySelector('.notifications__button')

  let count = 0
  let view = ''
  data.forEach((item) => {
    //For each item of the data array, create a notification card
    const notification = `
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
    // Add each notification card to the view string
    view += notification

    // Before
    // if (!item.read) {
    //   count++
    // }
    // After
    // Short-circuit conditional
    !item.read && count++
    numberOfNotifications.innerHTML = count
  })

  // Set the HTML of the notification content container to the generated view string
  notificationsContentContainer.innerHTML = view
  const unreadNotificationSpan = document.querySelectorAll('.unread')

  // Functions start
  function removeRedSpan() {
    for (let i = 0; i < unreadNotificationSpan.length; i++) {
      unreadNotificationSpan[i].remove()
    }
  }

  function decrement() {
    if (count > 0) {
      numberOfNotifications.innerHTML = count -= 1
    }
  }
  // Functions end


  // Event listeners with functions
  const unreadNotificationsCard =
    document.querySelectorAll('.unread-background')
  unreadNotificationsCard.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.remove('unread-background')
    })
  })

  // Toggle (show/hide) message on click
  const messageParagraph = document.querySelector('.message')
  messageParagraph.parentElement.parentElement.addEventListener('click', () => {
    messageParagraph.classList.toggle('hidden')
  })

  
  unreadNotificationSpan.forEach((redSpan) => {
    redSpan.parentElement.parentElement.parentElement.addEventListener(
      'click',
      () => {
        redSpan.remove()
        decrement()
      }
    )
  })

  markAllAsRead.addEventListener('click', () => {
    // Setting the number of notifications down to 0 when the user clicks "Mark all as read" button
    numberOfNotifications.innerHTML = 0
    // Removing the background color of all unread notifications when the user clicks "Mark all as read" button
    for (let i = 0; i < notificationsContentContainer.children.length; i++) {
      notificationsContentContainer.children[i].classList.remove('unread-background')
    }
    // Removing the span (red dot) for unread messages when the user clicks "Mark all as read" button
    removeRedSpan()
  })
}

window.addEventListener('DOMContentLoaded', init)
