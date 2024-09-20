import Image from "next/image";

interface TopAuthorProps {
  name: string;
  profilePicture: string;
  bio: string;
  postCount: number;
  followers: number;
}

const TopAuthor = ({ name, profilePicture, bio, postCount, followers }: TopAuthorProps) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-4">
        <Image
          src={profilePicture}
          alt={name}
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600 text-sm">{bio}</p>
        </div>
      </div>
      <div className="mt-4 flex text-sm text-gray-500 justify-between">
        <span><strong>{postCount}</strong> Posts</span>
        <span><strong>{followers}</strong> Followers</span>
      </div>
    </div>
  );
};

export default TopAuthor;
