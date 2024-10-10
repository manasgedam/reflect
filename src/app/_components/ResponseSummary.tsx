import React from 'react';

export default function ResponseSummary() {
    return (
        <div className='flex flex-col m-8 gap-6'>
            <div className='flex gap-3'>
                <div className='flex gap-5 items-center justify-between bg-primary rounded-md p-2 px-3 text-white'>
                    <span className='font-bold text-4xl'>165</span>
                    <span className='text-wrap leading-tight uppercase font-semibold text-[15px]'>Total <br />Responses</span>
                </div>
                <div className='flex items-center gap-3 justify-between border-2 border-primary h-[100] rounded-md p-2 pr-3 text-3xl font-bold'>
                    <span>😃</span>
                    <span>60%</span>
                </div>
                <div className='flex items-center gap-3 justify-between border-2 border-primary h-[100] rounded-md p-2 pr-3 text-3xl font-bold'>
                    <span>😔</span>
                    <span>14%</span>
                </div>
                <div className='flex items-center gap-3 justify-between border-2 border-primary h-[100] rounded-md p-2 pr-3 text-3xl font-bold'>
                    <span>😃</span>
                    <span>60%</span>
                </div>
                <div className='flex items-center gap-3 justify-between border-2 border-primary h-[100] rounded-md p-2 pr-3 text-3xl font-bold'>
                    <span>😔</span>
                    <span>14%</span>
                </div>
                <div className='flex items-center gap-3 justify-between border-2 border-primary h-[100] rounded-md p-2 pr-3 text-3xl font-bold'>
                    <span>😃</span>
                    <span>60%</span>
                </div>
                <div className='flex items-center gap-3 justify-between border-2 border-primary h-[100] rounded-md p-2 pr-3 text-3xl font-bold'>
                    <span>😔</span>
                    <span>14%</span>
                </div>
            </div>
            <div className="flex gap-5 h-[250px]">
                <div className="border border-gray-400 rounded-md flex-1 flex items-center justify-center">Space for Charts</div>
                <div className="border border-gray-400 rounded-md flex-1 flex items-center justify-center">Space for Charts</div>
            </div>
            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-bold'>Summary</h2>
                <p className='leading-6 text-justify text-md'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro mollitia iure tempora doloribus corporis, esse aliquid ab sapiente vel maxime veniam sequi earum ullam dolores eum obcaecati architecto unde iusto minus nostrum minima ut. Earum, tempore dolorum vel quisquam autem aut qui, suscipit aspernatur, sint odio modi consequuntur eaque neque numquam. Reiciendis, repellat sit! Libero illo delectus unde? Quidem dicta molestias consequatur, illum commodi facilis ipsa porro tempora voluptatibus vitae, impedit quam alias cum recusandae, incidunt tenetur. Voluptatum dolorum ipsam corrupti tenetur culpa perspiciatis tempora molestiae unde! Numquam, consequuntur. Suscipit totam corrupti voluptas! Tempora eaque vitae, iure saepe suscipit natus!
                </p>
            </div>
        </div>
    );
}
