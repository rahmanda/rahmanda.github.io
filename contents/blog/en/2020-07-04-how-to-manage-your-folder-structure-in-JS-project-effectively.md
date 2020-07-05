---
title: How to Manage Your Folder Structure in JS Project Effectively
summary: Folder structure may seem trivial. But if it done correctly, you can gain a lot of benefit from it. In this article, I will explain the importance of having a great folder structure and how to achieve it.
slug: how-to-manage-your-folder-structure-in-js-project-effectively
published_date: 2020-07-04
language: en
type: blog
translations:
  id: /blog/id/bagaimana-cara-mengelola-struktur-folder-di-projek-js-dengan-efektif
---

> It's a hard topic, I know. But I think it is still worth to discuss

Everybody has a different view on managing a folder structure, and this happens because of so many factors such as the choice of programming language, the framework that we are using, concepts, best practices, our own additional preferences etc etc etc. This is why there is no such thing like 'one folder structure for all cases'.

Even it may seem trivial, I think we need to give some time to structure our folders in a project. This is because we can gain benefit from having a folder structure that works.

## The benefit of having a great folder structure

Folders are not a code which can have a concept of abstraction. However, folders are still part of our code structure because every time we create a folder, we unconciously create another layer of ~~confusion~~ abstraction.

When we think about abstraction in programming, it generally means that we enable a simpler interface which hides the complexity of how things work behind. When we create a folder, we 'hide' some files inside of a folder, and the name of the folder is an 'interface' which we expose to the outside world. The outsiders know nothing about the folder before they open the folder and see what is inside.

Abstraction is a form of communication between engineers, and because folder is an abstraction, it is a form of communication too. A good abstraction is the one that doesn't make us spending too much time to start using it, and a good folder structure is the one that doesn't make us spending too much time to understand the big picture of a project. Of course, it depends on the size of the project. The larger the project, the more tendency to get more confusing than the smaller project. However, it doesn't mean that smaller projects are always easier to digest than larger projects. In multiple occasions, I found it difficult to make sense of some folder structures which was supposed to be a simple project.

So in general, folder structure plays a significant role of building a initial communication with engineers. When we create a good communication at the beginning, people will spend less time to read our project structure and start coding.

## Rule of thumbs

As I've mentioned before, there are many factors which shape our folder structure, thus there is no clear guideline of how to create the best structure for all situations. The best folder structure is the one that sparks joy for you, your team and the project at the moment. If your folder structure just hinder your work, probably there is something wrong with the structure.

To help you manage your folder structure effectively, I have made some rule of thumbs which I've gathered from my own experience. You may or may not start from exactly empty repository, but these rules are still applicable whether you are starting from scratch or not.

### Keep it as flat as you can

If you ever found yourself exploring a very deep directory, it is like digging a mine. You need to open multiple folders all the way down until you find the 'gold', which is the code file that you're looking for. And if you want to explore the other folder which is located in other part of the directory tree, you need to go back to the parent folders from your current position until you find the starting point which leads the way to the folder. This is why a folder structure which has a deeply nested directory is harder and time consuming to navigate compared to the one that has less.

You might argue that with a good code editor, we can easily do folders and files navigation with its built-in search feature, and I agree with that. I think majority of programmer today have used that feature intensively in their daily workflow. However, this kind of feature is only helpful if we already know what to search. If we are still learning about the project, I believe we will be 'digging-mine' the project folders. Therefore, keep in mind that every time we want to add a new folder, we make it harder for other people to navigate on our project.

Aside from navigation concern, a deep folder structure is also not convenient to use in our code. We usually split code into several modules, and different modules can be stored in different folders depending on our categorization. If we want to import a module which is located in a deeply nested directory, we need to write a longer reference to the module.

To flatten a folder structure, we can follow the approach at the example below.

Let's say we have a folder which has two level of nested directory like this.

```
helpers/
- number/
-- format.js
-- parse.js
- time/
-- diff.js
-- format.js
- string/
-- parse.js
-- format.js
-- sanitize.js
- object/
-- transform.js
```

Each folder in `helpers` folder has no more than three files, so it is better to just merge all files under the same folder into a single file like this.

```
helpers/
- number.js
- time.js
- string.js
- object.js
```

This way, we have reduced the complexity of the structure from two levels of nested directory to one. Now when we know a certain type from a helper function, we just have to look at one file instead of opening multiple files.

Or perhaps your code is so large that it will become ugly if we fit it into a single file. In that case, we can do something like this.

```
helpers/
- number.js
- time-diff.js
- time-format.js
- string.js
- object.js
```

Because the `time` helpers are supposedly large, we can split it into two files and add suffix into each filename. This way, we can still retain a flat structure without eliminating the clarity of the filename. Pay attention that even though we have chosen to split the `time` helpers, it is not necessarily required for the rest of the modules to follow this pattern especially if your helpers are small.

### Create folders only when necessary

I often find several cases where people put a folder with only one file or even no file at all. This happens most likely because one of three reasons below:

 1. Follow other project structure
 2. Result of using project bootstrapper
 3. Need to reserve some spaces for future use

Don't get me wrong, you can copy other people structure or use whatever bootstrapper you like. However, you need to know that you take full controls over your own folder structure. So, if you find some folders that stay empty or just contain one file for quite a long time, you should just remove them. You can add it later when you think you need that folder.

Reserving spaces is probably the most problematic thing on managing folder structure, especially when we just start creating a project. We tend to create a folder even if we aren't quite sure whether we will use it or not, and probably because we are influenced by other project structure. I think it is much simpler to just stick with our current requirement and not making assumption.

I want to mention one case that happens to pop up frequently in my job. Below is a typical component-based project structure which you might already familiar with.

```
app/
- components/
- pages/
- App.vue
- index.js
```

All folders here have a clear structure and naming. Not only we can quickly guess on what kind of files stored inside those folders, we can also figure roughly the libraries that we are using in this project. If look at the structure, it has a `pages` folder which is likely to have multiple files in there. Therefore, we can assume that this project has multiple pages and uses a router library. However when we open the folder, it only shows one file.

```
app/
- components/
- pages/
-- Landing.vue
- App.vue
- index.js
```

This structure suddenly becomes quite confusing because we didn't expect for `pages` folder to just have a single file, and our previous assumption can be a mistake. When I'm in this situation, I usually open the `index.js` to check whether the project uses a router or not. If it doesn't, then the `pages` folder become misleading (and if it does, why??). To improve the structure, we can just put the `Landing.vue` file into `components` folder, or merge it into `App.vue` file.

As you can see that by creating a folder, we can affect other people's perception when learning our project. Therefore, avoid creating a folder if not necessary.

### Create a meaningful name to your folders

I believe that there is nobody that intentionally want to confuse others with a false named folder in a project. However, this can still happen because naming is hard.

Honestly, I can't give you a straightforward tips for naming a folder, but I always stick to this whenever I'm giving a name to anything related to code:

> A name should represent the functionality of the code.

which is for this case, we can say that a folder name should represent a general functionality of the files inside it.

A flat folder structure can be useless if we don't properly name the folders. So please give a meaningful name to your folders.

### If it doesn't spark joy, restructure early

Folders restructuring is perhaps one of most daunting tasks for engineers, especially if the project has grown quite complex. A lot of errors can happen when we make changes to the folder structure because it will affect on import references when using modules. Because the risk is quite high, many engineers tend to avoid doing refactoring and restructuring.

If we have a flat folder structure, even in a relatively large project, restructuring will be much easier because we have many spaces to move things around (and hence, the first rule of thumbs was made). However if we are working with a deep structure in comparable-sized project and involves a few contributors, a careful planning and clear communication with our peers are necessary in order to keep code conflicts low when restructuring. Even so, we can't just leave the problem behind just because the process can be quite a hassle.

The best time to restructure folders is when you just start feeling uncomfortable with your own project. You shouldn't keep this structure any longer because the project will keep growing. And over the time, it will become harder to restructure.

If possible, restructure your folder earlier before it can affect negatively to your work. If it requires a large changes, you don't have to make a total revamp of your folder structure in one go. You can make a plan to split them into multiple stages so that your peers' work will be less affected and still keep the restructuring in progress. Plus, it can be easier to revert if there is a faulty in your changes.

With your engineer's intuition, you can feel it when something is wrong with your project structure. And when that time has come, you should definitely consider to restructure your folder as earlier as possible.

## Conclusion

A folder structure in a project can have a positive or negative impact on our work depending on how we manage it. There are four rule of thumbs that we can follow to manage a folder structure effectively:

1. Keep it as flat as you can
2. Create folders only when necessary
3. Create a meaningful name to your folder
4. If it doesn't spark joy, restructure early

In short, if you're just starting your project, keep maintaining a flat folder structure so that you can have more spaces to shape your project later. If you are working on an existing project and have a problem with the structure, don't hesitate to start restructuring it as earliest as possible.
