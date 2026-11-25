export const getNotesMocks = (search?: string) => {
  const items = [
    {
      id: 229434,
      title: 'Покупки к воскресному завтраку',
      items: [
        { id: 955611, name: 'Купить яйца', complete: false },
        { id: 447782, name: 'Взять багет в пекарне', complete: true },
      ],
    },
    {
      id: 632611,
      title: 'Переезд в новую квартиру',
      items: [
        { id: 652347, name: 'Подписать коробки с посудой', complete: true },
        { id: 444217, name: 'Заказать машину на субботу', complete: true },
        { id: 563988, name: 'Снять показания счётчиков', complete: true },
        { id: 194444, name: 'Собрать инструменты', complete: true },
        { id: 854566, name: 'Забрать ключи', complete: true },
        { id: 979243, name: 'Передать старый роутер', complete: true },
      ],
    },
    {
      id: 961437,
      title: 'Поход к Ладоге',
      items: [
        { id: 369410, name: 'Скачать карту тропы', complete: false },
        { id: 799296, name: 'Проверить прогноз ветра', complete: false },
        { id: 722333, name: 'Зарядить фонарь', complete: false },
        { id: 716427, name: 'Сложить дождевики', complete: false },
        { id: 536708, name: 'Купить билеты на электричку', complete: false },
      ],
    },
    {
      id: 539562,
      title: 'Балконный огород',
      items: [
        { id: 31954, name: 'Пересадить базилик', complete: false },
        { id: 957356, name: 'Замочить семена укропа', complete: false },
        { id: 944297, name: 'Подписать горшки', complete: false },
        { id: 90397, name: 'Закрепить ящик на перилах', complete: false },
        { id: 237476, name: 'Проверить дренаж', complete: false },
        { id: 86253, name: 'Полить рассаду', complete: true },
      ],
    },
    {
      id: 84892,
      title: 'Книжный клуб',
      items: [
        { id: 33498, name: 'Дочитать последнюю главу', complete: true },
        { id: 684074, name: 'Выписать две цитаты', complete: true },
        { id: 82558, name: 'Выбрать кафе для встречи', complete: true },
        { id: 489922, name: 'Разослать приглашения', complete: true },
        { id: 122478, name: 'Продлить книгу в библиотеке', complete: true },
      ],
    },
    {
      id: 685878,
      title: 'Подготовка велосипеда',
      items: [
        { id: 271616, name: 'Накачать колёса', complete: false },
        { id: 864551, name: 'Смазать цепь', complete: false },
        { id: 457738, name: 'Настроить задний тормоз', complete: true },
        { id: 13670, name: 'Подтянуть крепление фары', complete: true },
        { id: 89768, name: 'Проверить звонок', complete: false },
        { id: 991028, name: 'Положить запасную камеру', complete: false },
      ],
    },
    {
      id: 265279,
      title: 'Альбом из отпуска',
      items: [
        { id: 479174, name: 'Разобрать снимки с камеры', complete: false },
        { id: 834794, name: 'Выбрать фото для обложки', complete: true },
        { id: 971426, name: 'Подписать места съёмки', complete: true },
        { id: 330849, name: 'Сверстать разворот о маяке', complete: false },
        { id: 243858, name: 'Заказать печать', complete: false },
      ],
    },
    {
      id: 977898,
      title: 'Ужин с друзьями',
      items: [
        { id: 487650, name: 'Уточнить число гостей', complete: true },
        { id: 725146, name: 'Составить меню', complete: true },
        { id: 857182, name: 'Замариновать овощи', complete: false },
        { id: 934508, name: 'Испечь хлеб', complete: true },
        { id: 788969, name: 'Охладить лимонад', complete: true },
        { id: 330149, name: 'Накрыть стол', complete: true },
      ],
    },
    {
      id: 231688,
      title: 'Репетиция в студии',
      items: [
        { id: 44564, name: 'Забронировать комнату', complete: true },
        { id: 671214, name: 'Собрать сет-лист', complete: false },
        { id: 970417, name: 'Заменить струны', complete: true },
        { id: 370097, name: 'Взять кабель для записи', complete: true },
        { id: 472524, name: 'Распечатать аккорды', complete: false },
      ],
    },
    {
      id: 329968,
      title: 'Мастерская дома',
      items: [
        { id: 308141, name: 'Разложить свёрла по размерам', complete: false },
        { id: 733372, name: 'Повесить полку', complete: false },
        { id: 973165, name: 'Промаркировать ящики', complete: true },
        { id: 825343, name: 'Заменить лампу над столом', complete: true },
        { id: 639694, name: 'Убрать обрезки дерева', complete: true },
        { id: 322151, name: 'Свернуть удлинитель', complete: true },
      ],
    },
  ]

  if (search?.length) {
    return items.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));
  }
  return items;
}