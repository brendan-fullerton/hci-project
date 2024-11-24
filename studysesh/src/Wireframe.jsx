import React from 'react';

// Header: Displays the app's title or navigation elements
// Sidebar: options for such as the timer or settings options
// content : Display study tasks, Pomodoro timer, etc etc
// Footer: Show links, contact info, or documentation

// placeholder text used for each
function Wireframe() {
    return (
        <div className="container">
            <header className="text-center p-4">
                <h1>StudySesh App</h1>
            </header>
            <main className="row">
                <aside className="col-md-3">
                    <p>Sidebar (Timer/Settings)</p>
                </aside>
                <section className="col-md-9">
                    <p>Main content (Study session, tasks, etc.)</p>
                </section>
            </main>
            <footer className="text-center p-3">
                <p>Footer (Links, contact info, etc.)</p>
            </footer>
        </div>
    );
}

export default Wireframe;
