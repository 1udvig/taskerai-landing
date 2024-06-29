// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { AlertCircle, MessageCircle, User } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GitIssue = ({
  title,
  number,
  status,
  author,
  comments,
  labels,
  isSelected,
}) => {
  return (
    <Card
      className={`mt-2 scale-75 sm:scale-100 transition-all duration-300 hover:bg-green-200 ${
        isSelected ? "border-green-400 drop-shadow-lg" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertCircle
            className={`h-5 w-5 ${
              isSelected ? "text-blue-500" : "text-yellow-500"
            }`}
          />
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </div>
        <CardDescription>
          #{number} opened by {author}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {labels.map((label, index) => (
            <Badge key={index} variant={isSelected ? "default" : "secondary"}>
              {label}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span>{comments} comments</span>
        </div>
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={`https://github.com/${author}.png`}
              alt={author}
            />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <Badge variant={status === "open" ? "destructive" : "success"}>
            {status}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

const ScrollingGitIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const issues = [
    {
      title: "Fix login bug",
      number: 42,
      status: "open",
      author: "johndoe",
      comments: 5,
      labels: ["bug", "high priority"],
    },
    {
      title: "Add dark mode",
      number: 43,
      status: "open",
      author: "janedoe",
      comments: 3,
      labels: ["enhancement"],
    },
    {
      title: "Update documentation",
      number: 44,
      status: "closed",
      author: "bobsmith",
      comments: 1,
      labels: ["documentation"],
    },
    {
      title: "Optimize database queries",
      number: 45,
      status: "open",
      author: "alicejones",
      comments: 7,
      labels: ["performance", "database"],
    },
    {
      title: "Implement user roles",
      number: 46,
      status: "open",
      author: "charliegreen",
      comments: 4,
      labels: ["feature", "security"],
    },
  ];

  useEffect(() => {
    let scrollInterval;
    const scrollContainer = scrollContainerRef.current;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isUserScrolling) {
          scrollContainer.scrollTop += 1;
          if (
            scrollContainer.scrollTop + scrollContainer.clientHeight >=
            scrollContainer.scrollHeight
          ) {
            scrollContainer.scrollTop = 0;
          }
        }
      }, 10);
    };

    const handleUserScroll = () => {
      setIsUserScrolling(true);
      clearInterval(scrollInterval);
    };

    const handleScrollEnd = () => {
      setIsUserScrolling(false);
      startScrolling();
    };

    scrollContainer.addEventListener("scroll", handleUserScroll);
    scrollContainer.addEventListener("scroll", handleScrollEnd);

    startScrolling();

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener("scroll", handleUserScroll);
      scrollContainer.removeEventListener("scroll", handleScrollEnd);
    };
  }, [isUserScrolling]);

  return (
    <div className="w-full h-48 overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto flex flex-col items-center "
      >
        {issues.map((issue, index) => (
          <GitIssue
            key={index}
            title={issue.title}
            number={issue.number}
            status={issue.status}
            author={issue.author}
            comments={issue.comments}
            labels={issue.labels}
            isSelected={selectedIssue === index}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollingGitIssues;
