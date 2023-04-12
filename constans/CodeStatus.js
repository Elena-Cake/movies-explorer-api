const PATTERN_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const CodeStatus = {
  OK: {
    CODE: 200,
    MESSAGE: 'Успешно',
  },
  CREATED: {
    CODE: 201,
    USER_MESSAGE: 'Пользователь зарегестрирован',
    FILM_MESSAGE: 'Фильм добавлен',
  },
  NO_VALIDATE: {
    CODE: 400,
    MESSAGE: 'Переданы некорректные данные',
    MAIL_MESSAGE: 'Неправильный формат почты',
  },
  UNAUTHORIZED: {
    CODE: 401,
    MESSAGE: 'Проверьте почту и пароль',
  },
  FORBIDDEN: {
    CODE: 403,
    MESSAGE: 'Недостаточно прав',
  },
  UNDERFINED: {
    CODE: 404,
    USER_MESSAGE: 'Пользователь не найден',
    FILM_MESSAGE: 'Фильм не найден',
    PATH_MESSAGE: 'Обращение по необъявленному пути',
    TEAPOT_MESSAGE: 'я - чайник!',
  },
  CONFLICT: {
    CODE: 409,
    MESSAGE: 'Пользователь с такими данными уже существует',
  },
  INTERNAL: {
    CODE: 500,
    MESSAGE: 'Проблема во мне...',
  },
};

module.exports = { CodeStatus, PATTERN_URL };
