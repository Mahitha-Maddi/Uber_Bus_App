import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:5000/bookings-results";

class BookingService {

    getBookings(){
        return axios.get(USER_API_BASE_URL);
    }

    getBookingById(userId){
        return axios.get(USER_API_BASE_URL + '/' + bookingId);
    }

    updateBooking(booking, bookingId){
        return axios.put(USER_API_BASE_URL + '/' + bookingId, booking);
    }

    deleteBooking(bookingId){
        return axios.delete(USER_API_BASE_URL + '/' + bookingId);
    }
}

export default new BookingService();