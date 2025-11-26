document.addEventListener("DOMContentLoaded", () => {
  const secretButton = document.getElementById("secretButton");
  const modal = document.getElementById("passwordModal");
  const modalDialog = modal ? modal.querySelector(".modal-dialog") : null;
  const closeButton = document.getElementById("modalClose");
  const submitButton = document.getElementById("modalSubmit");
  const errorElement = document.getElementById("modalError");
  const inputs = Array.from(
    document.querySelectorAll(".modal-digit")
  );

  const CORRECT_PASSWORD = "456978";

  if (
    !secretButton ||
    !modal ||
    !modalDialog ||
    !closeButton ||
    !submitButton ||
    !inputs.length
  ) {
    return;
  }

  function resetInputs() {
    inputs.forEach((input) => {
      input.value = "";
    });
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  function focusFirstInput() {
    if (inputs[0]) {
      inputs[0].focus();
    }
  }

  function openModal() {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    resetInputs();
    focusFirstInput();
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  }

  function shakeWithMessage(message) {
    if (errorElement) {
      errorElement.textContent = message;
    }
    modalDialog.classList.remove("shake");
    void modalDialog.offsetWidth; // アニメーション再トリガー
    modalDialog.classList.add("shake");
  }

  // 入力補助：1文字入れたら次へ、Backspaceで前へ
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.slice(0, 1);
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
      if (e.key === "Enter") {
        handleSubmit();
      }
    });
  });

  function handleSubmit() {
    const code = inputs.map((i) => i.value).join("");

    if (code.length < inputs.length) {
      shakeWithMessage("6桁すべて入力してね。");
      return;
    }

    if (code === CORRECT_PASSWORD) {
      window.location.href =
        "https://note.com/saki_pochan/n/nb7a1fccdc5ea";
    } else {
      shakeWithMessage("パスワードが違います。");
    }
  }

  // ボタンタップでモーダルを開く
  secretButton.addEventListener("click", openModal);

  // モーダル内ボタン
  closeButton.addEventListener("click", () => {
    closeModal();
    resetInputs();
  });

  submitButton.addEventListener("click", handleSubmit);

  // モーダルの外側クリックで閉じる
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});



