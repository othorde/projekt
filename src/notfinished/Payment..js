// import React from "react";
// import { fireEvent, render, screen, act, waitForElementToBeRemoved } from "@testing-library/react";
// import Payment from "../components/Payment";
// import Api from '.././Api';


// describe('input value', () => {



//     it("updates input, for admin", () => {
//         const data = {
//             "show": true,
//             "id": "61a7715e7590d9b342ecb4e3",
//             "username": "othorde"
//         };
    
//         render(<Payment customer={data}/>)
//         const input = screen.getByPlaceholderText('Nytt saldo')
//         fireEvent.change(input, {target: {value:100}})
    
//         // Events and assertions...
//         expect(input.value).toBe("100")

//     })

//     it("updates input, for customer", () => {
//         const data = {
//             "show": true,
//             "id": "61a7715e7590d9b342ecb4e3",
//             "username": "othorde"
//         };
    
//         render(<Payment userDetails={data}/>)
//         const input = screen.getByPlaceholderText('Belopp att sätta in')
//         fireEvent.change(input, {target: {value:99}})
    
//         // Events and assertions...
//         expect(input.value).toBe("99")
//     })

//     it("submits form for admin", async () => {
//         const promise = Promise.resolve(true)
//         jest.spyOn(Api, 'updateUserFunds').mockImplementation(() => {
//             return Promise.resolve(true)
//         })

//         const data = {
//             "show": true,
//             "id": "61a7715e7590d9b342ecb4e3",
//             "username": "othorde"
//         };

//         render(<Payment customer={data}/>)

//         const input = await screen.findByPlaceholderText('Nytt saldo')
//         const button = await screen.findByRole('button',{name: /Ändra saldo/i})

//         fireEvent.change(input, {target: {value:100}})
//         fireEvent.click(button)

//         expect(input.value).toBe("100")
//         expect(Api.updateUserFunds).toHaveBeenCalled()

//     })  
// })



