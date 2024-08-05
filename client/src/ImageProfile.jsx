export default function ImageProfile({ src, ...rest }) {
    src = src && src.includes('https://')
        ? src
        : 'http://localhost:4001/UserPhoto/' + src;
    return (
        <img {...rest} src={src}  />
    );
}