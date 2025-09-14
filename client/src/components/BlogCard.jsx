import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge"
// import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { PiCalendarLight } from "react-icons/pi";
import usericon from '@/assets/images/user.png'
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const BlogCard = ({props}) => {
    // const user = useSelector((state) => state.user)
    return (
        <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
        <div className="transition-colors duration-300 
                    p-2 rounded-xl hover:bg-[repeating-linear-gradient(
                    45deg,
                     #f3e8ff,
                     #f3e8ff 10px,
                     #ffffff 10px,
                     #ffffff 20px
                   )] ">

        <Card className='pt-5 cursor-pointer border rounded-xl bg-white
                   transition-transform duration-200 ease-in-out 
                   hover:scale-105 
                   hover:shadow-[0_0_20px_rgba(139,82,246,0.6)] '>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-2">
                        <Avatar>
                            <AvatarImage src={props.author?.avatar || usericon } />
                        </Avatar>
                        <span>{ props.author?.name ? props.author?.name.charAt(0).toUpperCase()+ props.author?.name.slice(1) : "Deleted User"}</span>
                    </div>
                    { props.author?.role === 'admin' &&
                        <Badge variant='destructive' className='bg-violet-500'>Admin</Badge>

                    }
                </div>
                <div className="my-2">
                    {/* featured Image */}
                    <img src={props.featuredImage} className="rounded"/>
                </div>

                <div>
                    {/* date and title */}

                    <p className="flex items-center mb-2 gap-2 text-gray-700 text-sm">
                        <PiCalendarLight />
                        <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
                    </p>
                    <h2 className="text-2xl font-bold line-clamp-2">{props.title}</h2>

                </div>
            </CardContent>

        </Card>

        </div>
        </Link>
        
    )
};

export default BlogCard;
