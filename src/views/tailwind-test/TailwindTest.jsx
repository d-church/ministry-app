import React from 'react'

const TailwindTest = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Test Section - Simple Colors */}
      <div className="mb-8 p-4 bg-red-500 text-white" style={{backgroundColor: 'red', color: 'white'}}>
        <h1 className="text-2xl font-bold">TEST: Якщо ви бачите червоний фон і білий текст - Tailwind працює!</h1>
      </div>

      {/* Test Section - More Colors */}
      <div className="mb-8 space-y-2">
        <div className="bg-blue-500 text-white p-2" style={{backgroundColor: 'blue', color: 'white'}}>Blue background</div>
        <div className="bg-green-500 text-white p-2" style={{backgroundColor: 'green', color: 'white'}}>Green background</div>
        <div className="bg-yellow-500 text-black p-2" style={{backgroundColor: 'yellow', color: 'black'}}>Yellow background</div>
        <div className="bg-purple-500 text-white p-2" style={{backgroundColor: 'purple', color: 'white'}}>Purple background</div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tailwind CSS Test Page</h1>
        <p className="text-lg text-gray-600">Демонстрація різних Tailwind CSS утиліт та компонентів</p>
      </div>

      {/* Colors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Кольори</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center">Blue</div>
          <div className="bg-green-500 text-white p-4 rounded-lg text-center">Green</div>
          <div className="bg-red-500 text-white p-4 rounded-lg text-center">Red</div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg text-center">Yellow</div>
          <div className="bg-purple-500 text-white p-4 rounded-lg text-center">Purple</div>
          <div className="bg-pink-500 text-white p-4 rounded-lg text-center">Pink</div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Типографіка</h2>
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">Heading 1</h1>
          <h2 className="text-5xl font-semibold text-gray-800">Heading 2</h2>
          <h3 className="text-4xl font-medium text-gray-700">Heading 3</h3>
          <h4 className="text-3xl text-gray-600">Heading 4</h4>
          <h5 className="text-2xl text-gray-500">Heading 5</h5>
          <h6 className="text-xl text-gray-400">Heading 6</h6>
          <p className="text-lg text-gray-700 leading-relaxed">
            Це звичайний параграф тексту з довгим описом. Tailwind CSS дозволяє легко стилізувати текст
            за допомогою утилітарних класів.
          </p>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Кнопки</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Primary Button
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Success Button
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Danger Button
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Secondary Button
          </button>
          <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded">
            Outline Button
          </button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Картки</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-500 h-32"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Картка 1</h3>
              <p className="text-gray-600 mb-4">
                Це приклад картки з Tailwind CSS. Картки можуть містити різний контент.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Дії
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-500 h-32"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Картка 2</h3>
              <p className="text-gray-600 mb-4">
                Інша картка з різним кольором та контентом для демонстрації.
              </p>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Дії
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-purple-500 h-32"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Картка 3</h3>
              <p className="text-gray-600 mb-4">
                Третя картка показує різноманітність дизайну з Tailwind CSS.
              </p>
              <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Дії
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Форми</h2>
        <div className="max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ім'я
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введіть ваше ім'я"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Повідомлення
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder="Введіть ваше повідомлення"
            ></textarea>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Надіслати
          </button>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Сповіщення</h2>
        <div className="space-y-4">
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            <strong className="font-bold">Інформація!</strong>
            <span className="block sm:inline"> Це інформаційне повідомлення.</span>
          </div>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong className="font-bold">Успіх!</strong>
            <span className="block sm:inline"> Операція виконана успішно.</span>
          </div>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <strong className="font-bold">Попередження!</strong>
            <span className="block sm:inline"> Будь ласка, перевірте введені дані.</span>
          </div>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Помилка!</strong>
            <span className="block sm:inline"> Щось пішло не так.</span>
          </div>
        </div>
      </section>

      {/* Grid & Layout Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Сітка та макет</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-200 p-4 rounded text-center">1</div>
          <div className="bg-green-200 p-4 rounded text-center">2</div>
          <div className="bg-yellow-200 p-4 rounded text-center">3</div>
          <div className="bg-red-200 p-4 rounded text-center">4</div>
        </div>
      </section>

      {/* Responsive Design */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Адаптивний дизайн</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm md:text-base lg:text-lg xl:text-xl">
            Цей текст змінює розмір залежно від розміру екрану:
          </p>
          <ul className="mt-2 text-sm md:text-base">
            <li>• Mobile: маленький текст</li>
            <li>• Tablet: середній текст</li>
            <li>• Desktop: великий текст</li>
            <li>• Large Desktop: дуже великий текст</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-600">
          © 2024 Tailwind CSS Test Page. Створено з ❤️ та Tailwind CSS.
        </p>
      </footer>
    </div>
  )
}

export default TailwindTest
