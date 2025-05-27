let notificationPollingInterval = null;

async function startNotificationPolling() {
  if (notificationPollingInterval) return; // уже запущен

  // Сразу получить уведомления
  await fetchAndRenderNotifications();

  // Дальше опрашиваем сервер раз в минуту (или сколько нужно)
  notificationPollingInterval = setInterval(fetchAndRenderNotifications, 30000);
}

function stopNotificationPolling() {
  if (notificationPollingInterval) {
    clearInterval(notificationPollingInterval);
    notificationPollingInterval = null;
  }
}

// Пример функции запроса уведомлений и обновления UI
async function fetchAndRenderNotifications() {
  const response = await NotificationsService.getNotifications();
  handleNotificationBadge(response.data.Notifications);
}
