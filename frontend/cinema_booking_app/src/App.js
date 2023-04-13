import React from 'react'
import HourButton from './components/hourButton';
import DateButton from './components/dateButton';
import { MovieCard } from './components/movieCard';
import Footer from './components/footer';

function App() {
    return (
    <div>
        <HourButton label="9:00"/>
        <DateButton day="THU" dateDay="13" month="April"/>
        <MovieCard image="leon.png" title="Leon" duration="120" description="description"/>
        <Footer />
    </div>
    );
}

export default App;