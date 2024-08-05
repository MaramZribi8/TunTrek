import React from "react";
import "./blog.css";


const Blog = () => {
    const blogPosts = [
        {
            title: "Discover the Majestic Landscapes",
            image:
                "https://www.shutterstock.com/image-photo/attractive-summer-sunset-pink-rhododendron-260nw-1938394099.jpg",
            excerpt:
                "Embark on a journey through the stunning landscapes of Tunisia, where rugged mountains, lush oases, and vast desert expanses await. Traverse ancient trails that wind through picturesque valleys and ascend to breathtaking viewpoints. As you hike, immerse yourself in the rich tapestry of Tunisia's natural beauty, from the towering cliffs of the Atlas Mountains to the golden sands of the Sahara Desert",
        },
        {
            title: "Experience Authentic Berber Culture",
            image:
                "https://www.karlaroundtheworld.com/berber-cultural-center/berber-cultural-center-morrocco19/",
            excerpt:
                "Delve into the heart of Tunisia's Berber heritage as you trek through remote villages nestled among the mountains. Encounter warm hospitality as local Berber communities welcome you into their homes, sharing traditional meals and stories passed down through generations. Gain insight into age-old customs and traditions as you engage in cultural exchanges and witness traditional Berber music and dance under the starry desert skies.",
        },
        {
            title: "Connect with Nature and History",
            image:
                "https://plus.unsplash.com/premium_photo-1663039933263-a7e66c4d880d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwY29ubmVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
            excerpt:
                "Wander through ancient ruins and historical sites that bear witness to Tunisia's rich history and cultural heritage. Trek along ancient Roman roads, where echoes of the past resonate amidst the ruins of once-great civilizations. Explore hidden gems such as Dougga, a UNESCO World Heritage Site famed for its well-preserved Roman architecture, or Ksar Ouled Soltane, a stunning example of traditional Berber architecture nestled in the desert landscape. Each step offers a glimpse into Tunisia's storied past and its enduring connection to the land.",
        },
    ];

    return (
        <>
            <div className="blog-section">
                <h2 className="blog-title">Blog</h2>
                <div className="blog-posts">
                    {blogPosts.map((post, index) => (
                        <div className="blog-post" key={index}>
                            <img className="blog-image" src={post.image} alt={post.title} />
                            <h3 className="blog-post-title">{post.title}</h3>
                            <p className="blog-post-excerpt">{post.excerpt}</p>
                            <button
                                className="blog-post-button"
                                style={{ backgroundColor: "transparent" }}
                            >
                                Learn more
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Blog;