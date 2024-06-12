import { Product } from "../types/product";

export function ItemCard( {product}: {product: Product}) {
    const MAX_LENGTH = 60;

    const truncate = (str: string) => {
        if (str.length > MAX_LENGTH) {
            return str.substring(0, MAX_LENGTH) + "...";
        }
        return str;
    };

    return (
        <div className="container max-w-sm p-4 w-full">
            <div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
                <div className="prod-title">
                    <p className="text-2xl uppercase text-gray-900 font-bold">
                        {product.title}
                    </p>
                    <p className="uppercase text-sm text-gray-400">
                        {truncate(product.description)}
                    </p>
                </div>
                <div className="prod-img">
                    <img src={product.image} className="w-full object-cover object-center" />
                </div>
                <div className="prod-info grid gap-10">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
                        <p className="font-bold text-xl">
                            {product.price}$
                        </p>

                        <div
                            className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                        > 
                            {product.category}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}