function loadUserProfile() {
  console.log("🔄 Step 1: User clicks 'View Profile'");

  // 1. A delayed background task (Macrotask)
  setTimeout(() => {
    console.log("⏱️ Step 4: System analytics heartbeat logged to server.");
  }, 0);

  // 2. A high-priority data resolution (Microtask)
  Promise.resolve({ name: "Alex", VIP: true })
    .then((user) => {
      console.log(`👤 Step 3: Profile loaded! Welcome back, ${user.name}.`);
    });

  console.log("⚡ Step 2: UI skeleton loader displayed on screen");
}

loadUserProfile();
