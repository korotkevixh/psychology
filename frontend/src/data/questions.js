export const questions = [
  {
    id: 1,
    text: 'Когда я делаю что-нибудь хорошее, мои родители замечают это и хвалят меня',
    type: 'SCALE_4_ALWAYS',
    options: ['Всегда', 'Часто', 'Редко', 'Никогда'],
  },
  {
    id: 2,
    text: 'Если у меня возникают личные проблемы, я обращаюсь за помощью к родителям',
    type: 'SCALE_4_ALWAYS',
    options: ['Всегда', 'Часто', 'Редко', 'Никогда'],
  },
  {
    id: 3,
    text: 'Члены моей семьи ругаются и кричат друг на друга',
    type: 'SCALE_4_ALWAYS',
    options: ['Всегда', 'Часто', 'Редко', 'Никогда'],
  },
  {
    id: 4,
    text: 'Мне кажется, что родители меня не любят',
    type: 'SCALE_4_ALWAYS',
    options: ['Всегда', 'Часто', 'Редко', 'Никогда'],
  },
  {
    id: 5,
    text: 'Когда я нахожусь в кругу семьи, я чувствую себя в безопасности',
    type: 'SCALE_4_ALWAYS',
    options: ['Всегда', 'Часто', 'Редко', 'Никогда'],
  },
  {
    id: 6,
    text: 'Если я задерживаюсь, я звоню родителям',
    type: 'YES_NO',
    options: ['Да', 'Нет'],
  },
  {
    id: 7,
    text: 'В моей семье существует запрет на употребление алкоголя',
    type: 'YES_NO',
    options: ['Да', 'Нет'],
  },
  {
    id: 8,
    text: 'В моей семье существует запрет на употребление наркотиков',
    type: 'YES_NO',
    options: ['Да', 'Нет'],
  },
  {
    id: 9,
    text: 'Если я выпью пива, вина или крепкого алкоголя, мои родители:',
    type: 'CUSTOM_CHOICE',
    options: ['скорее всего, заметят', 'скорее всего, не заметят'],
  },
  {
    id: 10,
    text: 'В моей семье относятся к:',
    type: 'GROUPED_QUESTION',
    subQuestions: [
      { subId: 'cigarette', text: 'курению сигарет', type: 'SCALE_3_POSITIVE_NEGATIVE', options: ['Отрицательно', 'Нейтрально', 'Положительно'] },
      { subId: 'beer', text: 'употреблению пива', type: 'SCALE_3_POSITIVE_NEGATIVE', options: ['Отрицательно', 'Нейтрально', 'Положительно'] },
      { subId: 'strong_alcohol', text: 'употреблению крепкого алкоголя', type: 'SCALE_3_POSITIVE_NEGATIVE', options: ['Отрицательно', 'Нейтрально', 'Положительно'] },
      { subId: 'drugs', text: 'употреблению наркотиков, в том числе спайсов', type: 'SCALE_3_POSITIVE_NEGATIVE', options: ['Отрицательно', 'Нейтрально', 'Положительно'] },
    ]
  },
  {
    id: 11,
    text: 'В моей семье:',
    type: 'GROUPED_QUESTION',
    subQuestions: [
      { subId: 'smoke', text: 'курят', type: 'SCALE_4_NEVER_ALWAYS', options: ['Никогда', 'Редко', 'Часто', 'Всегда'] },
      { subId: 'drink_alcohol', text: 'употребляют алкоголь', type: 'SCALE_4_NEVER_ALWAYS', options: ['Никогда', 'Редко', 'Часто', 'Всегда'] },
      { subId: 'use_drugs', text: 'употребляют наркотики', type: 'SCALE_4_NEVER_ALWAYS', options: ['Никогда', 'Редко', 'Часто', 'Всегда'] },
    ]
  },
  {
    id: 12,
    text: 'Мое отношение к:',
    type: 'GROUPED_QUESTION',
    subQuestions: [
      { subId: 'cigarette', text: 'курению сигарет', type: 'SCALE_3_POSITIVE_NEGATIVE_REVERSE', options: ['Положительное', 'Нейтральное', 'Отрицательное'] },
      { subId: 'beer', text: 'употреблению пива', type: 'SCALE_3_POSITIVE_NEGATIVE_REVERSE', options: ['Положительное', 'Нейтральное', 'Отрицательное'] },
      { subId: 'strong_alcohol', text: 'употреблению крепкого алкоголя', type: 'SCALE_3_POSITIVE_NEGATIVE_REVERSE', options: ['Положительное', 'Нейтральное', 'Отрицательное'] },
      { subId: 'drugs', text: 'употреблению наркотиков, спайсов', type: 'SCALE_3_POSITIVE_NEGATIVE_REVERSE', options: ['Положительное', 'Нейтральное', 'Отрицательное'] },
    ]
  },
  {
    id: 13,
    text: 'Я считаю, что для организма:',
    type: 'GROUPED_QUESTION',
    subQuestions: [
      { subId: 'cigarette', text: 'курение сигарет', type: 'SCALE_2_PRO_CON', options: ['чем полезно', 'чем вредно'] },
      { subId: 'beer', text: 'употребление пива', type: 'SCALE_2_PRO_CON', options: ['чем полезно', 'чем вредно'] },
      { subId: 'strong_alcohol', text: 'употребление крепкого алкоголя', type: 'SCALE_2_PRO_CON', options: ['чем полезно', 'чем вредно'] },
      { subId: 'drugs', text: 'употребление наркотиков', type: 'SCALE_2_PRO_CON', options: ['чем полезно', 'чем вредно'] },
    ]
  },
  {
    id: 14,
    text: 'Я сам(-а):',
    type: 'GROUPED_QUESTION',
    subQuestions: [
      { subId: 'cigarettes', text: 'сигареты', type: 'SCALE_4_CONSUMPTION', options: ['Никогда не употреблял(-а)', 'Раньше употреблял(-а), но бросил(-а)', 'Иногда употребляю', 'Ежедневно употребляю'] },
      { subId: 'beer', text: 'пиво', type: 'SCALE_4_CONSUMPTION', options: ['Никогда не употреблял(-а)', 'Раньше употреблял(-а), но бросил(-а)', 'Иногда употребляю', 'Ежедневно употребляю'] },
      { subId: 'strong_alcohol', text: 'крепкий алкоголь', type: 'SCALE_4_CONSUMPTION', options: ['Никогда не употреблял(-а)', 'Раньше употреблял(-а), но бросил(-а)', 'Иногда употребляю', 'Ежедневно употребляю'] },
      { subId: 'drugs', text: 'наркотики, спайсы', type: 'SCALE_4_CONSUMPTION', options: ['Никогда не употреблял(-а)', 'Раньше употреблял(-а), но бросил(-а)', 'Иногда употребляю', 'Ежедневно употребляю'] },
    ]
  },
  {
    id: 15,
    text: 'Я чувствую себя одиноким',
    type: 'SCALE_4_ALWAYS_SOMETIMES_NEVER',
    options: ['Всегда', 'Часто', 'Иногда', 'Никогда'],
  },
  {
    id: 16,
    text: 'Я злюсь на весь мир',
    type: 'SCALE_4_ALWAYS_SOMETIMES_NEVER',
    options: ['Всегда', 'Часто', 'Иногда', 'Никогда'],
  },
  {
    id: 17,
    text: 'В кругу своих друзей я чувствую себя в безопасности',
    type: 'SCALE_4_ALWAYS_SOMETIMES_NEVER',
    options: ['Всегда', 'Часто', 'Иногда', 'Никогда'],
  },
  {
    id: 18,
    text: 'Решая свои проблемы, я учитываю мнение друзей',
    type: 'SCALE_4_ALWAYS_SOMETIMES_NEVER',
    options: ['Всегда', 'Часто', 'Иногда', 'Никогда'],
  },
  {
    id: 19,
    text: 'В моем классе (группе):',
    type: 'GROUPED_QUESTION',
    subQuestions: [
      { subId: 'smoke', text: 'курят', type: 'SCALE_4_GROUP_SIZE', options: ['Никто', 'Несколько человек', 'Около половины', 'Большинство'] },
      { subId: 'beer', text: 'употребляют пиво', type: 'SCALE_4_GROUP_SIZE', options: ['Никто', 'Несколько человек', 'Около половины', 'Большинство'] },
      { subId: 'strong_alcohol', text: 'употребляют крепкий алкоголь', type: 'SCALE_4_GROUP_SIZE', options: ['Никто', 'Несколько человек', 'Около половины', 'Большинство'] },
      { subId: 'drugs', text: 'употребляют наркотики, спайсы', type: 'SCALE_4_GROUP_SIZE', options: ['Никто', 'Несколько человек', 'Около половины', 'Большинство'] },
    ]
  },
  {
    id: 20,
    text: 'Среди моих друзей:',
    type: 'GROUPED_QUESTION',
    subQuestions: [
      { subId: 'smoke', text: 'курят', type: 'SCALE_4_GROUP_SIZE', options: ['Никто', 'Несколько человек', 'Около половины', 'Большинство'] },
      { subId: 'beer', text: 'употребляют пиво', type: 'SCALE_4_GROUP_SIZE', options: ['Никто', 'Несколько человек', 'Около половины', 'Большинство'] },
      { subId: 'strong_alcohol', text: 'употребляют крепкий алкоголь', type: 'SCALE_4_GROUP_SIZE', options: ['Никто', 'Несколько человек', 'Около половины', 'Большинство'] },
      { subId: 'drugs', text: 'употребляют наркотики, спайсы', type: 'SCALE_4_GROUP_SIZE', options: ['Никто', 'Несколько человек', 'Около половины', 'Большинство'] },
    ]
  },
  {
    id: 21,
    text: 'Если бы кто-то из моих друзей захотел приобрести что-либо из перечисленного, легко ли ему было бы это сделать:',
    type: 'GROUPED_QUESTION',
    subQuestions: [
      { subId: 'cigarettes', text: 'сигареты', type: 'SCALE_4_EASY_HARD', options: ['Очень легко', 'Довольно легко', 'Довольно сложно', 'Невозможно'] },
      { subId: 'beer', text: 'пиво', type: 'SCALE_4_EASY_HARD', options: ['Очень легко', 'Довольно легко', 'Довольно сложно', 'Невозможно'] },
      { subId: 'strong_alcohol', text: 'крепкий алкоголь', type: 'SCALE_4_EASY_HARD', options: ['Очень легко', 'Довольно легко', 'Довольно сложно', 'Невозможно'] },
      { subId: 'drugs', text: 'наркотики, спайсы', type: 'SCALE_4_EASY_HARD', options: ['Очень легко', 'Довольно легко', 'Довольно сложно', 'Невозможно'] },
    ]
  }
]; 