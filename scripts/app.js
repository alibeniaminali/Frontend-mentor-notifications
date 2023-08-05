import data from '../data.js'

function init() {
  const notificationsContentContainer = document.querySelector(
    '.notifications__content'
  )
  const numberOfNotifications = document.querySelector('.notifications__number')
  const markAllAsRead = document.querySelector('.notifications__button')

  let view = ''
  data.forEach((item) => {
    //For each item of the data array, create a notification card
    const notification = `
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
    // Add each notification card to the view string
    view += notification
  })

  // Set the HTML of the notification content container to the generated view string
  notificationsContentContainer.innerHTML = view
  const unreadNotificationSpan = document.querySelectorAll('.unread')

  // Set the HTML of the notifications number to the length of the unread notifications
  numberOfNotifications.innerHTML = unreadNotificationSpan.length
  const unreadNotificationsCard =
    document.querySelectorAll('.unread-background')

  unreadNotificationsCard.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.remove('unread-background')
      const unreadCard = document.querySelectorAll('.unread-background')
      // This is checking if the last child has a class value of unread. If it does, remove the last child. This ensures we are not always removing the last child, but only removing the last child if it has the unread class
      if (
        card.children[1].children[0].children[
          card.children[1].children[0].children.length - 1
        ].classList.value === 'unread'
      ) {
        card.children[1].children[0].children[
          card.children[1].children[0].children.length - 1
        ].remove()
      }
      numberOfNotifications.innerHTML = unreadCard.length
    })
  })

  markAllAsRead.addEventListener('click', () => {
    unreadNotificationSpan.forEach((redSpan) => {
      redSpan.classList.remove('unread') // 1. On click remove all the spans with class unread
      const unreadNotificationSpan = document.querySelectorAll('.unread') // 2. At this point we don't have spans with unread class anymore
      numberOfNotifications.innerHTML = unreadNotificationSpan.length // 3. Set the innerHTML of the notifications number to the number of the spans containing unread class (which should be 0, because of step 1)
    })

    for (let i = 0; i < notificationsContentContainer.children.length; i++) {
      //1. Checks if any of the children of the notifications content container contains a class of unread-background
      //2. If any of the children contains a class of unread-background, remove the class from the child
      //3. This way we apply the action only to the children that contain this class, if we don't add the if statement we will try to remove the class even from the children that don't contain that class, which is not neccessary
      if (
        notificationsContentContainer.children[i].classList.contains(
          'unread-background'
        )
      ) {
        notificationsContentContainer.children[i].classList.remove(
          'unread-background'
        )
      }
    }
  })

  // Toggle (show/hide) message on click
  const messageParagraph = document.querySelector('.message')
  messageParagraph.parentElement.parentElement.addEventListener('click', () => {
    messageParagraph.classList.toggle('hidden')
  })
}

window.addEventListener('DOMContentLoaded', init)
